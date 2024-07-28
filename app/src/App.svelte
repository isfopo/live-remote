<script lang="ts">
  import { Method } from "./types/Message";
  import { state } from "./state";
  import Connect from "./views/Connect.svelte";
  import Remote from "./views/Remote.svelte";
</script>

<main>
  {#if $state.socket && $state.socket.readyState === WebSocket.OPEN}
    <Remote />
  {:else}
    <Connect />
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
