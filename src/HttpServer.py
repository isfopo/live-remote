from __future__ import with_statement
import socket
import threading
import os
from _Framework.ControlSurface import ControlSurface


class HttpServer:
    def __init__(self, host="0.0.0.0", port=8080, web_root="public"):
        self.host = host
        self.port = port
        self.web_root = web_root
        self.server_thread = threading.Thread(target=self.run_server)
        self.server_thread.daemon = True
        self.server_socket = None

    def start(self):
        if self.server_socket is None:
            self.server_thread.start()

    def run_server(self):
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server_socket.bind((self.host, self.port))
        self.server_socket.listen(1)

        while True:
            client_socket, addr = self.server_socket.accept()
            print(
                f"Connection from {addr}"
            )  # Use log message or appropriate logging in practice
            request = client_socket.recv(1024)
            print(
                f"Request: {request.decode('utf-8')}"
            )  # Use log message or appropriate logging in practice

            # Basic parsing of the request to get the requested path
            request_line = request.decode("utf-8").splitlines()[0]
            requested_file = self.parse_request(request_line)

            try:
                if requested_file == "/":
                    requested_file = "/index.html"  # Default to index file

                # Build file path
                file_path = os.path.join(
                    os.path.dirname(os.path.abspath(__file__)),
                    self.web_root,
                    requested_file.lstrip("/"),
                )

                with open(file_path, "rb") as f:
                    file_extension = os.path.splitext(file_path)[1]
                    content_type = (
                        "text/html" if file_extension == ".html" else "text/css"
                    )

                    html_response = f.read()
                    response_header = "HTTP/1.1 200 OK\r\n"
                    response_header += f"Content-Type: {content_type}\r\n"
                    response_header += f"Content-Length: {len(html_response)}\r\n"
                    response_header += "Connection: closed\r\n\r\n"
                    client_socket.sendall(
                        response_header.encode("utf-8") + html_response
                    )

            except FileNotFoundError:
                not_found_response = (
                    b"HTTP/1.1 404 NOT FOUND\r\n\r\n<h1>404 Not Found</h1>"
                )
                client_socket.sendall(not_found_response)

            client_socket.close()

    def parse_request(self, request_line):
        try:
            method, path, _ = request_line.split()
            return path
        except ValueError:
            return "/"

    def stop(self):
        if self.server_socket:
            self.server_socket.close()


class LiveRemote(ControlSurface):
    __module__ = __name__
    __doc__ = "Simple Starter Script"

    def __init__(self, c_instance):
        ControlSurface.__init__(self, c_instance)
        with self.component_guard():
            self.http_server = HttpServer(
                web_root="public"
            )  # Set the web root to your build directory
            self.http_server.start()

    def disconnect(self):
        """Clean up on disconnect"""
        ControlSurface.disconnect(self)
        self.http_server.stop()
        return None
