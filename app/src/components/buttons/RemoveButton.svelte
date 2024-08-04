<script lang="ts">
  import { state } from "../../state";
  import type { WidgetId } from "../../widgets";
  import IconButton from "./IconButton.svelte";
  import { FaSolidX } from "svelte-icons-pack/fa";

  export let id: WidgetId;
</script>

<span class={`remove-button ${$state.grid.editing ? "show" : ""}`}>
  <IconButton
    icon={FaSolidX}
    onClick={() => $state.grid.remove(id)}
    color="primaryContainer"
    title="Remove"
  />
</span>

<style>
  .remove-button {
    position: absolute;
    top: -2rem;
    right: -2rem;
    padding: 0.5rem;
    opacity: 0;
    transition: transform 0.2s opacity 0.2s;
    background-color: var(--theme-onPrimaryContainer);
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
</style>
