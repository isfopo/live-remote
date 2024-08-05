import type { ComponentType } from "svelte";
import TransportWidget from "../widgets/TransportWidget.svelte";
import type { Song } from "../types/Live";
import type { LayoutItem } from "svelte-grid-extended";

export type WidgetId = "transport";

/** Represents the location of a widget on the user's grid */
export interface WidgetOnGrid extends LayoutItem {
  id: WidgetId;
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Represents the data that a widget needs to render */
export interface WidgetMeta {
  component: ComponentType;
  name: string;
  listeners: Array<keyof Song>;
  w: number;
  h: number;
}

export const widgets: Record<WidgetId, WidgetMeta> = {
  transport: {
    component: TransportWidget,
    name: "Transport",
    listeners: ["is_playing", "record_mode"],
    w: 5,
    h: 2,
  },
};
