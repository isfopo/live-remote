<script lang="ts">
  import { state } from "../../state";
  import Dialog from "./Dialog.svelte";
  import { widgets, type WidgetId } from "../../widgets";

  let selectedWidget: WidgetId | null = null;

  const closeAddMenu = () => {
    state.update((state) => {
      state.grid.adding = false;
      return state;
    });
  };

  const addWidget = () => {
    if (selectedWidget) {
      $state.grid.add(selectedWidget);
    }
    closeAddMenu();
  };

  const onSelect = (id: string) => {
    selectedWidget = id as WidgetId;
  };

  const getWidgetName = (id: string) => {
    return widgets[id as WidgetId].name;
  };
</script>

<Dialog isOpen={$state.grid.adding} close={closeAddMenu} success={addWidget}>
  <h2>Select a Widget</h2>

  {#each Object.keys(widgets) as id}
    {#if !$state.grid.items.find((w) => w.id === id)}
      <button on:click={() => onSelect(id)}>
        {getWidgetName(id)}
      </button>
    {/if}
  {/each}
</Dialog>
