<script lang="ts">
  import { Icon, type IconType } from "svelte-icons-pack";
  export let onClick: () => void;
  export let icon: IconType;
  export let color: string = "#000";
  export let size: number = 48;
</script>

<button on:click={onClick}>
  <Icon src={icon} {size} {color} />
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
