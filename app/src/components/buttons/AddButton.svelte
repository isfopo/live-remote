<script lang="ts">
  import { state } from "../../state";
  import IconButton from "./IconButton.svelte";
  import { FaSolidPlus } from "svelte-icons-pack/fa";

  const openAddMenu = () => {
    state.update((state) => {
      state.grid.adding = true;
      return state;
    });
  };
</script>

<IconButton icon={FaSolidPlus} onClick={openAddMenu} title="Add" />
