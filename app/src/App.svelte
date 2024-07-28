<script lang="ts">
  import { writable } from "svelte/store";
  import {
    Method,
    type IncomingMessage,
    type OutgoingMessage,
  } from "./types/Message";
  import type { Live } from "./types/Live";

  type State = {
    live: Live;
    socket: WebSocket | null;
  };

  export const state = writable<State>({
    live: { song: { is_playing: 0, record_mode: 0, tempo: 120 } },
    socket: null,
  });

  export const connect = () => {
    const socket = new WebSocket(
      `ws://${window.serverIp}:${window.serverPort}`
    );

    socket.addEventListener("message", async (message) => {
      const { address, prop, result }: IncomingMessage = JSON.parse(
        message.data
      );

      state.update((state) => ({
        ...state,
        live: {
          ...state.live,
          [address]: { [prop]: result },
        },
      }));
    });

    // Store the WebSocket instance in the state
    state.update((state) => ({
      ...state,
      socket,
    }));
  };

  export const send = (message: OutgoingMessage) => {
    // Get the current state
    state.update((state) => {
      const { socket } = state;
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      }
      return state;
    });
  };
</script>

<main>
  <h1>Hello, this is Live Remote!</h1>
  {#if $state.socket && $state.socket.readyState === WebSocket.OPEN}
    <button
      on:click={() =>
        send({
          method: Method.SET,
          address: "song",
          prop: "is_playing",
          value: 1,
          type: "int",
        })}>Play</button
    >
  {:else}
    <button on:click={connect}>Connect</button>
  {/if}
  <p>
    <strong>Is Playing:</strong>
    {$state.live.song.is_playing}
  </p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
