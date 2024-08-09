<script lang="ts">
  import { Icon, type IconType } from "svelte-icons-pack";
  import { state } from "../../state";
  import type { ThemeColors } from "../../theme/types";

  export let title: string;
  export let icon: IconType;
  export let size: number = 24;
  export let color: ThemeColors = "onPrimaryContainer";
  export let onClick: () => void;

  let showTooltip = false;
  let _color: string = $state.theme.get(color);

  $: {
    _color = $state.theme.get(color);
  }

  const handleMouseEnter = () => {
    showTooltip = true;
  };

  const handleMouseLeave = () => {
    showTooltip = false;
  };
</script>

<div
  class="button-container"
  role="button"
  tabindex="0"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:focus={handleMouseEnter}
  on:blur={handleMouseLeave}
  on:keydown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      onClick();
    }
  }}
>
  <button on:click={onClick} {title}>
    <Icon src={icon} {size} color={_color} />
  </button>

  {#if showTooltip}
    <div role="tooltip" class="tooltip">
      {title}
    </div>
  {/if}
</div>

<style>
  .button-container {
    position: relative;
    display: inline-block;
  }
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

  .tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--theme-surface);
    color: var(--theme-onSurface);
    border-radius: 4px;
    padding: 5px;
    white-space: nowrap;
    z-index: 10;
  }
</style>
