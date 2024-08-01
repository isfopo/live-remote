<script lang="ts">
  import Grid, { GridItem } from "svelte-grid-extended";
  import TransportWidget from "../widgets/TransportWidget.svelte";

  const items = [{ id: "transport-widget", x: 0, y: 0, w: 2, h: 5 }];

  const itemSize = { height: 40 };

  const widgets: Record<string, any> = {
    "transport-widget": TransportWidget,
  };
</script>

<Grid {itemSize} cols={10} collision="none">
  {#each items as { id, x, y, w, h }}
    <GridItem {x} {y} {w} {h} resizable={false}>
      <svelte:component this={widgets[id]} />
    </GridItem>
  {/each}
</Grid>
