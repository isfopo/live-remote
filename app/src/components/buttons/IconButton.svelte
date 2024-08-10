<script lang="ts">
  import { Icon, type IconType } from "svelte-icons-pack";
  import { state } from "../../state";
  import type { ThemeColors } from "../../theme/types";

  export let title: string;
  export let icon: IconType;
  export let size: number = 24;
  export let color: ThemeColors = "onPrimaryContainer";
  export let onClick: () => void;
  export let showTooltipOnHover: boolean = false;
  export let direction: "left" | "right" | "top" | "bottom" = "left";

  let showTooltip = false;
  let _color: string = $state.theme.get(color);

  $: {
    _color = $state.theme.get(color);
  }

  const handleMouseEnter = () => {
    if (showTooltipOnHover) {
      showTooltip = true;
    }
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
    <div role="tooltip" class={`tooltip ${direction}`}>
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
    transition: transform 0.1s ease-in-out;
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
    background-color: var(--theme-surfaceBright);
    color: var(--theme-onSurface);
    border-radius: 4px;
    padding: 0.5rem 1rem;
    white-space: nowrap;
    z-index: 10;
  }

  .top {
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, -1rem);
  }

  .right {
    left: 100%;
    top: 50%;
    transform: translate(1rem, -50%);
  }

  .left {
    right: 100%;
    top: 50%;
    transform: translate(-1rem, -50%);
  }

  .bottom {
    top: 100%;
    left: 50%;
    transform: translate(-50%, 1rem);
  }
</style>
