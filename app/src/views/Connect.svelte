<script lang="ts">
  import { onMount } from "svelte";
  import { state } from "../state";
  import type { IncomingMessage } from "../types/Message";
  import type { State } from "../types/State";
  import Spinner from "../components/loaders/Spinner.svelte";

  const connect = (): void => {
    try {
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
    } catch {
      state.update(
        (state): State => ({
          ...state,
          socket: null,
          error: "There was an error connecting to Ableton Live.",
        })
      );
    }
  };

  onMount(connect);
</script>

{#if $state.error}
  <div class="error">
    <p>{$state.error}</p>
    <button on:click={connect}>Retry</button>
  </div>
{:else}
  <Spinner />
{/if}
