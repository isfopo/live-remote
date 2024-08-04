<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { widgets, type WidgetId } from "../widgets";
  import { state } from "../state";
  import { Method } from "../types/Message";
  import RemoveButton from "../components/buttons/RemoveButton.svelte";

  export let id: WidgetId;

  onMount(() => {
    if (!widgets[id]) {
      throw new Error(`Widget with id "${id}" not found`);
    }

    for (const listener of widgets[id].listeners) {
      console.log("Listening to", listener);
      $state.send({
        method: Method.LISTEN,
        address: "song",
        prop: listener,
      });
    }
  });

  onDestroy(() => {
    for (const listener of widgets[id].listeners) {
      $state.send({
        method: Method.UNLISTEN,
        address: "song",
        prop: listener,
      });
    }
  });
</script>

<div class={`widget ${$state.grid.editing ? "editing" : ""}`}>
  <RemoveButton {id} />
  <div class={$state.grid.editing ? "block-events" : ""}>
    <slot />
  </div>
</div>

<style>
  .widget {
    border: none;
    width: 100%;
    border-radius: 8px;
    padding: 16px;
    background-color: transparent;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    transition: background-color 0.2s ease-in-out;
  }

  @keyframes wobble {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(5deg);
    }
    75% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  .editing {
    background-color: var(--theme-primaryContainer);
    animation: wobble 0.5s linear infinite;
  }

  .block-event {
    pointer-events: none;
  }
</style>
