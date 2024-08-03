<script lang="ts">
  import { Icon, type IconType } from "svelte-icons-pack";
  import { state } from "../../state";
  import type { ThemeColors } from "../../theme/types";

  export let title: string;
  export let icon: IconType;
  export let size: number = 48;
  export let color: ThemeColors = "onPrimaryContainer";
  export let onClick: () => void;

  let _color: string = $state.theme.get(color);

  $: {
    _color = $state.theme.get(color);
  }
</script>

<button on:click={onClick} {title}>
  <Icon src={icon} {size} color={_color} />
</button>

<style>
  button {
    border: none;
    background: none;
    padding: 0;
    margin: 0;
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
