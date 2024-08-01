import { writable } from "svelte/store";
import type { OutgoingMessage } from "./types/Message";
import type { Live } from "./types/Live";
import { themes, type ThemeColors, type ThemeNames } from "./theme";
import { setRootColors } from "./helpers/styles";

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
};

const initialTheme = (localStorage.getItem("currentTheme") ??
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light")) as ThemeNames;

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

      // Use subscribe to get the current state
      state.subscribe((currentState) => {
        const currentThemeName = currentState.theme.current; // Get the current theme name
        const currentThemeColors = themes[currentThemeName]; // Access the colors for the current theme

        // Safely access the color value
        if (currentThemeColors && color in currentThemeColors) {
          themeValue = currentThemeColors[color]; // Update the value
        }
      })(); // Immediately invoke to capture the current state

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
});

setRootColors(initialTheme);
