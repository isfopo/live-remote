from __future__ import with_statement
from _Framework.ControlSurface import ControlSurface
from .Handler import Handler
from .HttpServer import HttpServer
from .WebsocketServer import WebsocketServer


class LiveRemote(ControlSurface):
    __module__ = __name__
    __doc__ = "Live Remote"

    def __init__(self, c_instance):
        ControlSurface.__init__(self, c_instance)
        try:
            with self.component_guard():
                self._start_websocket_server()
                self._start_http_server()

            self.show_message(f"Live Remote is available at {self.http_server.url}")

        except Exception as e:
            self.log_message(str(e))
            self.disconnect()

    def _start_websocket_server(self):
        self.websocket_server = WebsocketServer(self)
        self.handler = Handler(self, server=self.websocket_server)

        self.websocket_server.on_connect = self.handler.on_connection
        self.websocket_server.on_message = self.handler.on_message
        self.websocket_server.on_disconnect = self.handler.on_disconnect

        self.websocket_server.start()

    def _start_http_server(self):
        self.http_server = HttpServer(
            control_surface=self, websocket_port=self.websocket_server.port
        )
        self.http_server.start()

    def disconnect(self):
        """Clean up on disconnect"""
        ControlSurface.disconnect(self)
        if self.http_server:
            self.http_server.stop()  # Stop HTTP Server
        if self.websocket_server:
            self.websocket_server.stop()  # Stop WebSocket Server
        return None
