<script lang="ts">
  import { writable } from "svelte/store";
  import {
    Method,
    type IncomingMessage,
    type OutgoingMessage,
  } from "./types/Message";

  type State = {
    messages: Array<IncomingMessage>;
    socket: WebSocket | null;
  };

  export const state = writable<State>({
    messages: [],
    socket: null,
  });

  export const connect = () => {
    const socket = new WebSocket(
      `ws://${window.serverIp}:${window.serverPort}`
    );

    socket.addEventListener("message", async (message: any) => {
      const data: IncomingMessage = JSON.parse(message.data);

      state.update((state) => ({
        ...state,
        messages: [data].concat(state.messages),
      }));
    });

    // Store the WebSocket instance in the state
    state.update((prevState) => ({
      ...prevState,
      socket,
    }));
  };

  export const send = (message: OutgoingMessage) => {
    // Get the current state
    state.update((prevState) => {
      const { socket } = prevState;
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      }
      return prevState;
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
