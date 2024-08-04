import { writable } from "svelte/store";
import type { OutgoingMessage } from "./types/Message";
import type { Live } from "./types/Live";
import { themes } from "./theme";
import { setRootColors } from "./helpers/styles";
import type { ThemeNames, ThemeColors } from "./theme/types";
import type { WidgetId, WidgetOnGrid } from "./widgets";

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
    editing: boolean;
    items: WidgetOnGrid[];
    update: (item: WidgetOnGrid) => void;
    adding: boolean;
    add: (item: WidgetId) => void;
    remove: (id: WidgetId) => void;
  };
};

const initialTheme = (localStorage.getItem("currentTheme") ??
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light")) as ThemeNames;

const defaultGrid = [{ id: "transport", x: 0, y: 0, w: 2, h: 5 }];

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
    add: (item: WidgetId): void => {
      state.update((state): State => {
        if (state.grid.items.find((i) => i.id === item)) return state;

        state.grid.items.push({
          id: item,
          x: 0,
          y: 0,
          w: 1,
          h: 1,
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
