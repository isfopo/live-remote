from __future__ import with_statement
import socket
import threading
import os

from .constants import HTTP_SERVER_PORT


class HttpServer:
    def __init__(
        self,
        websocket_port: int,
        host: str = "0.0.0.0",
        port: int = HTTP_SERVER_PORT,
        web_root: str = "public",
    ):
        self.host = host
        self.port = port
        self.websocket_port = websocket_port
        self.web_root = web_root
        self.server_ip = socket.gethostbyname(socket.gethostname())
        self.server_thread = threading.Thread(target=self.run_server)
        self.server_thread.daemon = True
        self.server_socket = None
        self.running = False

    @property
    def url(self):
        return f"http://{self.server_ip}:{self.port}"

    def start(self):
        if self.server_socket is None:
            self.running = True
            self.server_thread = threading.Thread(target=self.run_server)
            self.server_thread.daemon = True
            self.server_thread.start()

    def run_server(self):
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server_socket.bind((self.host, self.port))
        self.server_socket.listen(1)

        while self.running:
            try:
                client_socket, addr = self.server_socket.accept()
                request = client_socket.recv(1024)

                if not request:
                    break

                # Basic parsing of the request to get the requested path
                request_line = request.decode("utf-8").splitlines()[0]
                requested_file = self.parse_request(request_line)

                if requested_file == "/":
                    requested_file = "/index.html"  # Default to index file

                # Build file path
                file_path = os.path.join(
                    os.path.dirname(os.path.abspath(__file__)),
                    self.web_root,
                    requested_file.lstrip("/"),
                )

                with open(file_path, "rb") as f:
                    file_extension = os.path.splitext(file_path)[-1]
                    content_type = (
                        "text/html"
                        if file_extension == ".html"
                        else "application/javascript"
                        if file_extension == ".js"
                        else "text/css"
                        if file_extension == ".css"
                        else "image/png"
                        if file_extension == ".png"
                        else "image/jpeg"
                        if file_extension in [".jpg", ".jpeg"]
                        else "application/octet-stream"  # Fallback for binary files
                    )

                    # Read file content as bytes
                    file_content = f.read()

                    # If the content type is text, decode it for replacement
                    if "text" in content_type:
                        file_content = file_content.decode("utf-8")
                        # Replace the placeholder in the HTML with the server IP
                        file_content = file_content.replace(
                            "{{SERVER_IP}}", self.server_ip
                        )
                        file_content = file_content.replace(
                            "{{SERVER_PORT}}", str(self.websocket_port)
                        )
                        file_content = file_content.encode("utf-8")
                    else:
                        # No need to replace for binary files, just return as-is
                        pass

                    # Build the HTTP response
                    response_header = "HTTP/1.1 200 OK\r\n"
                    response_header += f"Content-Type: {content_type}\r\n"
                    response_header += f"Content-Length: {len(file_content)}\r\n"
                    response_header += "Connection: closed\r\n\r\n"

                    # Ensure everything is bytes before concatenation
                    client_socket.sendall(
                        response_header.encode("utf-8") + file_content
                    )

            except FileNotFoundError:
                not_found_response = (
                    b"HTTP/1.1 404 NOT FOUND\r\n\r\n<h1>404 Not Found</h1>"
                )
                client_socket.sendall(not_found_response)

        self.server_socket.close()

    def parse_request(self, request_line):
        try:
            method, path, _ = request_line.split()
            return path
        except ValueError:
            return "/"

    def stop(self):
        self.running = False
        if self.server_socket:
            self.server_socket.close()
        if self.server_thread:
            self.server_thread.join()
