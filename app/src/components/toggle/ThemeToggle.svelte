<script lang="ts">
  import { state } from "../../state";
</script>

<button
  on:click={() =>
    $state.theme.set($state.theme.current === "dark" ? "light" : "dark")}
  >{$state.theme.current}</button
>
