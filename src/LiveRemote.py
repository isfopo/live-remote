from __future__ import with_statement
from _Framework.ControlSurface import ControlSurface
from .HttpServer import HttpServer


class LiveRemote(ControlSurface):
    __module__ = __name__
    __doc__ = "Simple Starter Script"

    def __init__(self, c_instance):
        ControlSurface.__init__(self, c_instance)
        with self.component_guard():
            self.http_server = HttpServer()
            self.http_server.start()

    def disconnect(self):
        """Clean up on disconnect"""
        ControlSurface.disconnect(self)
        self.http_server.stop()
        return None
