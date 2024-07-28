import { writable } from "svelte/store";
import type { State } from "./types/State";
import type { IncomingMessage, OutgoingMessage } from "./types/Message";

export const state = writable<State>({
  socket: null,
  live: { song: { is_playing: 0, record_mode: 0, tempo: 120 } },
  connect: (): void => {
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
  },
  send: (message: OutgoingMessage): void => {
    state.update((state): State => {
      const { socket } = state;
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      }
      return state;
    });
  },
});
