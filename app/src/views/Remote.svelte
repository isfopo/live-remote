<script lang="ts">
  import Grid, { GridItem } from "svelte-grid-extended";
  import { widgets, type WidgetOnGrid } from "../widgets";
  import { state } from "../state";

  const items: WidgetOnGrid[] = [{ id: "transport", x: 0, y: 0, w: 2, h: 5 }];

  const itemSize = { height: 40 };
</script>

<Grid {itemSize} cols={10} collision="none" readOnly={!$state.editing}>
  {#each items as { id, x, y, w, h }}
    <GridItem {x} {y} {w} {h} resizable={false}>
      <svelte:component this={widgets[id].component} />
    </GridItem>
  {/each}
</Grid>
