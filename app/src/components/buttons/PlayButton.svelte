<script lang="ts">
  import IconButton from "./IconButton.svelte";
  import { state } from "../../state";
  import { FaSolidPlay } from "svelte-icons-pack/fa";
  import { Method } from "../../types/Message";
  import { listen } from "../../hooks/listen";

  listen("song", "is_playing");
</script>

<IconButton
  icon={FaSolidPlay}
  onClick={() =>
    $state.send({
      method: Method.SET,
      address: "song",
      prop: "is_playing",
      value: 1,
      type: "int",
    })}
  color={$state.live.song.is_playing ? "#32cd32" : "#000"}
/>
