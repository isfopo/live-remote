<script lang="ts">
  import IconButton from "./IconButton.svelte";
  import { state } from "../../state";
  import { FaSolidCircle } from "svelte-icons-pack/fa";
  import { Method } from "../../types/Message";
  import { listen } from "../../hooks/listen";

  listen("song", "record_mode");
</script>

<IconButton
  icon={FaSolidCircle}
  onClick={() =>
    $state.send({
      method: Method.SET,
      address: "song",
      prop: "record_mode",
      value: 1,
      type: "int",
    })}
  color={$state.live.song.record_mode ? "record" : "foreground"}
  title="Record"
/>
