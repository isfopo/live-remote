<script lang="ts">
  import Grid, {
    GridItem,
    type LayoutChangeDetail,
  } from "svelte-grid-extended";
  import { widgets, type WidgetOnGrid } from "../widgets";
  import { state } from "../state";
  import DialogContainer from "../components/dialogs/DialogContainer.svelte";

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
      <svelte:component this={widgets[id].component} />
    </GridItem>
  {/each}
</Grid>

<DialogContainer />
