<script lang="ts">
  import Grid, { GridItem } from "svelte-grid-extended";

  const items = [
    { id: "0", x: 0, y: 0, w: 2, h: 5 },
    { id: "1", x: 2, y: 2, w: 2, h: 2 },
    { id: "2", x: 2, y: 0, w: 1, h: 2 },
    { id: "3", x: 3, y: 0, w: 2, h: 2 },
    { id: "4", x: 4, y: 2, w: 1, h: 3 },
    { id: "5", x: 8, y: 0, w: 2, h: 8 },
  ];

  const itemSize = { height: 40 };
</script>

<Grid {itemSize} cols={10} collision="none">
  {#each items as item}
    <GridItem x={item.x} y={item.y} w={item.w} h={item.h}>
      <div class="item">{item.id}</div>
    </GridItem>
  {/each}
</Grid>
