from typing import Dict, Union

import Live


class ClientCodes:
    """
    A class to store client codes
    """

    _map: Dict[int, int] = {}

    def new(self, client_id):
        self._map[client_id] = Live.Application.get_random_int(  # type: ignore
            1000, 9999
        )

    def remove(self, client_id: int):
        del self._map[client_id]

    def validate(self, client_id: int, code: Union[int, None]):
        if code is not None and self._map[client_id] == code:
            return True
        else:
            return False

    def get(self, client_id: int):
        return self._map[client_id]
