<script lang="ts">
  import IconButton from "./components/buttons/IconButton.svelte";
  import AddButton from "./components/buttons/AddButton.svelte";
  import EditButton from "./components/buttons/EditButton.svelte";
  import ThemeToggle from "./components/buttons/ThemeToggleButton.svelte";
  import { IoMenu, IoClose } from "svelte-icons-pack/io";

  let isOpen = false;

  function toggleSidebar() {
    isOpen = !isOpen;
  }
</script>

<div>
  <div class="toggle-button">
    <IconButton
      onClick={toggleSidebar}
      title={isOpen ? "Hide Sidebar" : "Show Sidebar"}
      icon={isOpen ? IoClose : IoMenu}
      color={"onSurface"}
    />
  </div>

  <div class="sidebar {isOpen ? 'open' : ''}">
    <div class="buttons">
      <ThemeToggle />
      <EditButton />
      <AddButton />
    </div>
  </div>
</div>

<style>
  .sidebar {
    position: fixed;
    bottom: 0;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: var(--theme-primaryContainer);
    padding: 0.5rem;
    transform: translateX(100%);
    transition: transform 0.1s ease-in-out;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .toggle-button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    position: fixed;
    padding: 0.5rem;
    top: 0.5rem;
    right: 0.5rem;
    z-index: 1000;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    padding: 0.5rem;
  }
</style>
