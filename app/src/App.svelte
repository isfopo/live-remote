<script lang="ts">
  import { writable } from "svelte/store";
  import { IncomingMessage, Method, OutgoingMessage } from "./types/Message";

  type State = {
    messages: Array<IncomingMessage>;
    socket: WebSocket | null; // Store WebSocket instance
  };

  // Create a new store with the given data.
  export const state = writable<State>({
    messages: [],
    socket: null, // Initialize WebSocket to null
  });

  export const connect = () => {
    // Create a new websocket
    const socket = new WebSocket("ws://localhost:8000");

    socket.addEventListener("message", async (message: any) => {
      // Parse the incoming message here
      const data: IncomingMessage = JSON.parse(message.data);
      // Update the state.  That's literally it.  This can happen from anywhere:
      // we're not in a component, and there's no nested context.

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
      // If the WebSocket is connected, send a message
      const socket = prevState.socket;
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
