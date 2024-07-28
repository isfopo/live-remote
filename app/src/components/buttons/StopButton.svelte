<script lang="ts">
  import IconButton from "./IconButton.svelte";
  import { state } from "../../state";
  import { FaSolidStop } from "svelte-icons-pack/fa";
  import { Method } from "../../types/Message";
</script>

<IconButton
  icon={FaSolidStop}
  onClick={() =>
    $state.send({
      method: Method.SET,
      address: "song",
      prop: "is_playing",
      value: 0,
      type: "int",
    })}
/>
