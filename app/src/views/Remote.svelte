<script lang="ts">
  import { widgets, type WidgetOnGrid } from "../widgets";
  import { state } from "../state";
  import DialogContainer from "../components/dialogs/DialogContainer.svelte";
  import { Grid, GridItem, type LayoutChangeDetail } from "../components/grid";

  const itemSize = { height: 40 };

  const change = (e: CustomEvent<LayoutChangeDetail>): void => {
    $state.grid.update(e.detail.item as WidgetOnGrid);
  };
</script>

<Grid
  {itemSize}
  cols={10}
  collision="push"
  on:change={change}
  readOnly={!$state.grid.editing}
>
  {#each $state.grid.items as { id, x, y, w, h }}
    <GridItem {id} {x} {y} {w} {h} resizable={false}>
      <svelte:component this={widgets[id]?.component} />
    </GridItem>
  {/each}
</Grid>

<DialogContainer />

<style>
  .container {
    width: 100%;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
  }
</style>
