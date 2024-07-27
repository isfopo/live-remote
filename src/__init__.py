from .Liveremote import LiveRemote


def create_instance(c_instance):
    """Creates and returns Remote Script instance"""
    return Liveremote(c_instance)
