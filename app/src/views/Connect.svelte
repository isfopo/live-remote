<script lang="ts">
  import { state } from "../state";
  import type { IncomingMessage } from "../types/Message";
  import type { State } from "../types/State";

  const connect = (): void => {
    const socket = new WebSocket(
      `ws://${window.serverIp}:${window.serverPort}`
    );

    socket.addEventListener("message", async (message) => {
      const { address, prop, value }: IncomingMessage = JSON.parse(
        message.data
      );

      state.update(
        (state): State => ({
          ...state,
          live: {
            ...state.live,
            [address]: { [prop]: value },
          },
        })
      );
    });

    // Store the WebSocket instance in the state
    state.update(
      (state): State => ({
        ...state,
        socket,
      })
    );
  };
</script>

<button on:click={connect}>Connect</button>
