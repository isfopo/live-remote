<script lang="ts">
  import { Method } from "./types/Message";
  import { state } from "./state";
  import Connect from "./views/Connect.svelte";
</script>

<main>
  {#if $state.socket && $state.socket.readyState === WebSocket.OPEN}
    <button
      on:click={() =>
        $state.send({
          method: Method.SET,
          address: "song",
          prop: "is_playing",
          value: 1,
          type: "int",
        })}>Play</button
    >
  {:else}
    <Connect />
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

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
