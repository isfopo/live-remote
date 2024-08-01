<script lang="ts">
  import { Icon, type IconType } from "svelte-icons-pack";
  import { state } from "../../state";
  import type { ThemeColors } from "../../theme";
  export let onClick: () => void;
  export let icon: IconType;
  export let color: ThemeColors = "foreground";
  let _color: string = $state.theme.get(color);
  export let size: number = 48;

  $: {
    _color = $state.theme.get(color);
  }
</script>

<button on:click={onClick}>
  <Icon src={icon} {size} color={_color} />
</button>

<style>
  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }
  button:hover,
  button:focus,
  button:active {
    outline: none;
    background-color: transparent;
    transform: scale(1.1);
  }
</style>
