<script lang="ts">
  import { state } from "../../state";
  import type { WidgetId } from "../../widgets";
  import IconButton from "./IconButton.svelte";
  import { FaSolidX } from "svelte-icons-pack/fa";

  export let id: WidgetId;
</script>

<button
  class={`remove-button ${$state.grid.editing ? "show" : ""}`}
  on:click={() => $state.grid.remove(id)}
  tabindex="0"
  aria-pressed="false"
>
  <IconButton
    icon={FaSolidX}
    color="inverseOnSurface"
    title="Remove"
    size={12}
  />
</button>

<style>
  .remove-button {
    position: absolute;
    top: -1rem;
    right: -1rem;
    padding: 0.5rem;
    opacity: 0;
    transition: transform 0.2s opacity 0.2s;
    background-color: var(--theme-inverseSurface);
    border-radius: 50%;
    cursor: pointer;
    z-index: 100;
  }

  .remove-button.show {
    opacity: 1;
  }

  .remove-button:hover {
    transform: scale(1.1);
  }

  .remove-button:active {
    transform: scale(0.9);
    background-color: var(--theme-onSurfaceVariant);
  }
</style>
