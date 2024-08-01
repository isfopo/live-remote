<script lang="ts">
  import { state } from "../../state";
  import IconButton from "./IconButton.svelte";
  import { FaMoon, FaSun } from "svelte-icons-pack/fa";
</script>

<IconButton
  onClick={() =>
    $state.theme.set($state.theme.current === "dark" ? "light" : "dark")}
  icon={$state.theme.current === "dark" ? FaSun : FaMoon}
  title={$state.theme.current === "dark"
    ? "Switch to light mode"
    : "Switch to dark mode"}
/>
