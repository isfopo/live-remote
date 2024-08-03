<script lang="ts">
  import Grid, {
    GridItem,
    type LayoutChangeDetail,
  } from "svelte-grid-extended";
  import { widgets, type WidgetOnGrid } from "../widgets";
  import { state } from "../state";

  const storedItems = localStorage.getItem("gridItems");
  const items: WidgetOnGrid[] = storedItems
    ? JSON.parse(storedItems)
    : [{ id: "transport", x: 0, y: 0, w: 2, h: 5 }];

  function handleGridChange(e: CustomEvent<LayoutChangeDetail>) {
    console.log(e.detail);
    // localStorage.setItem("gridItems", JSON.stringify(e.detail.item));
  }

  const itemSize = { height: 40 };
</script>

<Grid
  {itemSize}
  cols={10}
  collision="none"
  on:change={handleGridChange}
  readOnly={!$state.grid.editing}
>
  {#each items as { id, x, y, w, h }}
    <GridItem {id} {x} {y} {w} {h} resizable={false}>
      <svelte:component this={widgets[id].component} />
    </GridItem>
  {/each}
</Grid>
