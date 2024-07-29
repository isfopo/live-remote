import { onDestroy, onMount } from "svelte";
import { Method } from "../types/Message";
import type { Live } from "../types/Live";
import { state } from "../state";

export const listen = (
  address: keyof Live,
  prop: keyof Live[typeof address]
): void => {
  onMount(() => {
    state.update((state) => {
      state.send({
        // Use 'state' directly as the store is passed
        method: Method.LISTEN,
        address,
        prop,
      });
      return state;
    });
  });

  onDestroy(() => {
    state.update((state) => {
      state.send({
        // Use 'state' directly as the store is passed
        method: Method.UNLISTEN,
        address,
        prop,
      });
      return state;
    });
  });
};
