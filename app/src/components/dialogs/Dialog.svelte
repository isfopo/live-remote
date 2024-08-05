<script lang="ts">
  export let isOpen: boolean = false;
  export let close: () => void;
  export let success: () => void | undefined;

  let dialog: HTMLDialogElement;

  const _close: () => void = () => {
    dialog.close();
    close();
  };

  const _success: () => void = () => {
    dialog.close();
    success();
  };

  $: {
    if (isOpen) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  }
</script>

<dialog bind:this={dialog} on:close={_close}>
  <span class="body">
    <slot />
  </span>
  <button type="button" on:click={_close}>Close</button>
  {#if success !== undefined}
    <button type="button" on:click={_success}>Submit</button>
  {/if}
</dialog>

<style>
  dialog {
    border: none;
    position: absolute;
    margin: auto;
    border-radius: 8px;
    padding: 16px;
    width: 300px;
    color: var(--theme-onSurface);
    background-color: var(--theme-surfaceBright);
  }

  dialog::backdrop {
    opacity: 0.5;
    transition: opacity 0.2s ease-in-out;
    background-color: var(--theme-shadow);
  }
  .body {
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: flex-start;
    margin-bottom: 16px;
  }
</style>
