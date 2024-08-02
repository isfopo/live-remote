<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { widgets, type WidgetId } from "../widgets";
  import { state } from "../state";
  import { Method } from "../types/Message";

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

<div class="widget">
  <slot />
</div>

<style>
  .widget {
    border: 1px solid #ccc;
    width: 100%;
    border-radius: 8px;
    padding: 16px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
