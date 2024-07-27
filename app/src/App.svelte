<script lang="ts">
  import { getContext, setContext } from "svelte";
  import { writable } from "svelte/store";

  type State = {
    requests: Array<Request>;
    ws: WebSocket | null; // Store WebSocket instance
  };

  // Create a new store with the given data.
  export const state = writable<State>({
    requests: [],
    ws: null, // Initialize WebSocket to null
  });

  export const connect = () => {
    // Create a new websocket
    const ws = new WebSocket("ws://localhost:8000");

    ws.addEventListener("message", async (message: any) => {
      // Parse the incoming message here
      const data: Request = JSON.parse(message.data);
      // Update the state.  That's literally it.  This can happen from anywhere:
      // we're not in a component, and there's no nested context.

      state.update((state) => ({
        ...state,
        requests: [data].concat(state.requests),
      }));
    });

    // Store the WebSocket instance in the state
    state.update((prevState) => ({
      ...prevState,
      ws: ws,
    }));
  };

  export const send = () => {
    // Get the current state
    state.update((prevState) => {
      // If the WebSocket is connected, send a message
      const ws = prevState.ws;
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send("hello ableton"); // Send the formatted message
      }
      return prevState;
    });
  };
</script>

<main>
  <h1>Hello, this is Live Remote!</h1>
  <button on:click={connect}>Connect</button>
  <button on:click={send}>Send</button>
  {#each $state.requests as request}
    <p>{request.url}</p>
  {/each}
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
