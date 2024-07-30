<script lang="ts">
  import ThemeToggle from "./components/toggle/ThemeToggle.svelte";
  import ThemeContext from "./context/ThemeContext.svelte";
  import { state } from "./state";
  import Connect from "./views/Connect.svelte";
  import Remote from "./views/Remote.svelte";
</script>

<main>
  <ThemeContext>
    <ThemeToggle />
    {#if $state.socket && $state.socket.readyState === WebSocket.OPEN}
      <Remote />
    {:else}
      <Connect />
    {/if}
  </ThemeContext>
</main>

<style>
  main {
    text-align: center;
    background-color: var(--theme-background);
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    max-width: 240px;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
