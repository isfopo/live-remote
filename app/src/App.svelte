<script lang="ts">
  import EditButton from "./components/buttons/EditButton.svelte";
  import ThemeToggle from "./components/buttons/ThemeToggleButton.svelte";
  import { state } from "./state";
  import Connect from "./views/Connect.svelte";
  import Remote from "./views/Remote.svelte";
</script>

<main>
  <header>
    <ThemeToggle />
    <EditButton />
  </header>
  {#if $state.socket && $state.socket.readyState === WebSocket.OPEN}
    <Remote />
  {:else}
    <Connect />
  {/if}
</main>

<style>
  main {
    text-align: center;
    background-color: var(--theme-background);
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
