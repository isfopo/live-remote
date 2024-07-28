<script lang="ts">
  import { state } from "../state";
  import { Method } from "../types/Message";
</script>

<button
  on:click={() =>
    $state.send({
      method: Method.SET,
      address: "song",
      prop: "is_playing",
      value: 1,
      type: "int",
    })}>Play</button
>
<p>
  <strong>Is Playing:</strong>
  {$state.live.song.is_playing}
</p>
