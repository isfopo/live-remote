import type { ComponentType } from "svelte";
import TransportWidget from "../widgets/TransportWidget.svelte";

export type WidgetId = "transport";

export interface WidgetItems {
  id: WidgetId;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const widgets: Record<string, ComponentType> = {
  transport: TransportWidget,
};
