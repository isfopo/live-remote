<script lang="ts">
  import { state, type State } from "../../state";
  import IconButton from "./IconButton.svelte";
  import { FaSolidPen } from "svelte-icons-pack/fa";

  const toggle = () => {
    state.update(
      (state): State => ({
        ...state,
        grid: {
          ...state.grid,
          editing: !state.grid.editing,
        },
      })
    );
  };
</script>

<IconButton icon={FaSolidPen} onClick={toggle} title="Edit" />
