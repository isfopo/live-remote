<script lang="ts">
  import { state } from "../../state";
  import IconButton from "./IconButton.svelte";
  import { FaSolidPen } from "svelte-icons-pack/fa";
</script>

<IconButton
  icon={FaSolidPen}
  onClick={() => {
    state.update((state) => ({
      ...state,
      editing: !state.editing,
    }));
  }}
  title="Edit"
/>
