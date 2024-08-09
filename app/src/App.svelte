<script lang="ts">
  import AddButton from "./components/buttons/AddButton.svelte";
  import EditButton from "./components/buttons/EditButton.svelte";
  import ThemeToggle from "./components/buttons/ThemeToggleButton.svelte";
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
<footer>
  <ThemeToggle />
  <EditButton />
  <AddButton />
</footer>

<style>
  main {
    text-align: center;
    background-color: var(--theme-background);
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: var(--theme-primaryContainer);
    padding: 1rem;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
