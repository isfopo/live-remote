import { writable } from "svelte/store";
import type { OutgoingMessage } from "./types/Message";
import type { Live } from "./types/Live";
import { themes } from "./theme";
import { setRootColors } from "./helpers/styles";
import type { ThemeNames, ThemeColors } from "./theme/types";
import { widgets, type WidgetId, type WidgetOnGrid } from "./widgets";

export type State = {
  socket: WebSocket | null;
  theme: {
    current: ThemeNames;
    available: ThemeNames[];
    set: (theme: ThemeNames) => void;
    get: (color: ThemeColors) => string;
  };
  live: Live;
  send: (message: OutgoingMessage) => void;
  error: string | undefined;
  grid: {
    items: WidgetOnGrid[];
    editing: boolean;
    adding: boolean;
    update: (item: WidgetOnGrid) => void;
    add: (item: WidgetId) => void;
    remove: (id: WidgetId) => void;
  };
};

const initialTheme = (localStorage.getItem("currentTheme") ??
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light")) as ThemeNames;

const defaultGrid = [widgets["transport"]];

export const state = writable<State>({
  socket: null,
  theme: {
    current: initialTheme,
    available: ["dark", "light"],
    set: (theme: ThemeNames): void => {
      setRootColors(theme);

      localStorage.setItem("currentTheme", theme);
      state.update((state): State => {
        state.theme.current = theme;
        return state;
      });
    },
    get: (color: ThemeColors): string => {
      let themeValue: string = "";

      state.subscribe((currentState) => {
        const currentThemeColors = themes[currentState.theme.current];

        if (currentThemeColors && color in currentThemeColors) {
          themeValue = currentThemeColors[color];
        }
      })();

      return themeValue;
    },
  },
  live: { song: { is_playing: 0, record_mode: 0, tempo: 120 } },
  send: (message: OutgoingMessage): void => {
    state.update((state): State => {
      const { socket } = state;
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      }
      return state;
    });
  },
  error: undefined,
  grid: {
    editing: false,
    items: localStorage.getItem("gridItems")
      ? JSON.parse(localStorage.getItem("gridItems") ?? "")
      : defaultGrid,
    update: (item: WidgetOnGrid): void => {
      state.update((state): State => {
        const index = state.grid.items.findIndex((i) => i.id === item.id);
        if (index !== -1) {
          state.grid.items[index] = {
            ...state.grid.items[index],
            ...item,
          };
        }
        localStorage.setItem("gridItems", JSON.stringify(state.grid.items));
        return state;
      });
    },
    adding: false,
    add: (id: WidgetId): void => {
      state.update((state): State => {
        if (state.grid.items.find((i) => i.id === id)) return state;

        const { w, h } = widgets[id];

        state.grid.items.push({
          id,
          x: 0,
          y: 0,
          w,
          h,
        } as WidgetOnGrid);

        localStorage.setItem("gridItems", JSON.stringify(state.grid.items));
        return state;
      });
    },
    remove: (id: WidgetId): void => {
      state.update((state): State => {
        state.grid.items = state.grid.items.filter((item) => item.id !== id);
        localStorage.setItem("gridItems", JSON.stringify(state.grid.items));
        return state;
      });
    },
  },
});

setRootColors(initialTheme);
