<script lang="ts">
  export let isOpen: boolean = false;
  export let close: () => void;
</script>

<dialog class="dialog" open={isOpen} on:close={close}>
  <slot></slot>
  <button type="button" on:click={close}>Close</button>
</dialog>

<style>
  .dialog {
    border: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    padding: 16px;
    width: 300px;
    color: var(--theme-onSurface);
    background-color: var(--theme-surfaceBright);
  }
</style>
