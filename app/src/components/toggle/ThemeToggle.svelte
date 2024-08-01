<script lang="ts">
  import { state } from "../../state";
  import IconButton from "../buttons/IconButton.svelte";
  import { FaMoon, FaSun } from "svelte-icons-pack/fa";
</script>

<IconButton
  onClick={() =>
    $state.theme.set($state.theme.current === "dark" ? "light" : "dark")}
  icon={$state.theme.current === "dark" ? FaMoon : FaSun}
/>
