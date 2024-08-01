import type { ComponentType } from "svelte";
import TransportWidget from "../widgets/TransportWidget.svelte";

export type WidgetName = "transport";

export interface WidgetItems {
  id: WidgetName;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const widgets: Record<string, ComponentType> = {
  transport: TransportWidget,
};
