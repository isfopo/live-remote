from http.server import SimpleHTTPRequestHandler, HTTPServer
import socket
import os
import threading
from _Framework import ControlSurface
from .constants import HTTP_SERVER_PORT


class CustomHTTPRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        self.control_surface = kwargs.pop("control_surface", None)
        self.server_ip = kwargs.pop("server_ip", "127.0.0.1")
        self.websocket_port = kwargs.pop("websocket_port", 8081)
        self.web_root = kwargs.pop("web_root", "public")
        super().__init__(*args, **kwargs)

    def do_GET(self):
        if self.path == "/":
            self.path = "/index.html"  # Default to index file

        try:
            file_path = os.path.join(
                os.path.dirname(os.path.abspath(__file__)),
                self.web_root,
                self.path.lstrip("/"),
            )

            with open(file_path, "rb") as f:
                content_type = self.guess_type(file_path)

                file_content = f.read()

                if "text" in content_type:
                    file_content = file_content.decode(
                        "utf-8"
                    )  # Decode it first to work with str
                    # Replace placeholders in the HTML with the server IP and port
                    file_content = file_content.replace("{{SERVER_IP}}", self.server_ip)
                    file_content = file_content.replace(
                        "{{SERVER_PORT}}", str(self.websocket_port)
                    )
                    file_content = file_content.encode(
                        "utf-8"
                    )  # Encode it back to bytes

                self.send_response(200)
                self.send_header("Content-Type", content_type)
                self.send_header("Content-Length", str(os.path.getsize(file_path)))
                self.end_headers()
                self.wfile.write(file_content)

        except FileNotFoundError:
            self.send_error(404, "File not found")
        except Exception as e:
            self.control_surface.log_message(f"Error: {e}")
            self.send_error(500, "Internal Server Error")

    def translate_path(self, path):
        """Override to use the specified web root."""
        web_root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "public")
        return os.path.join(web_root, path.lstrip("/"))


class HttpServer(threading.Thread):
    def __init__(
        self,
        control_surface: ControlSurface.ControlSurface,
        websocket_port: int,
        host: str = "0.0.0.0",
        port: int = HTTP_SERVER_PORT,
    ):
        super().__init__()
        self.control_surface = control_surface
        self.host = host
        self.port = port
        self.websocket_port = websocket_port
        self.server_ip = socket.gethostbyname(socket.gethostname())
        self.httpd = None

    @property
    def url(self):
        return f"http://{self.server_ip}:{self.port}"

    def run(self):
        def handler(*args, **kwargs):
            return CustomHTTPRequestHandler(
                *args,
                control_surface=self.control_surface,
                server_ip=self.server_ip,
                websocket_port=self.websocket_port,
                **kwargs,
            )

        self.httpd = HTTPServer((self.host, self.port), handler)
        self.control_surface.log_message(f"Serving HTTP on {self.url}")
        self.httpd.serve_forever()

    def stop(self):
        if self.httpd:
            self.httpd.shutdown()
            self.httpd.server_close()
            self.httpd = None
            self.control_surface.log_message("HTTP server stopped.")
