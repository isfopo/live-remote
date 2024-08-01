export type ThemeNames = "light" | "dark";
export type HexColor = `#${string}`;

export type ThemeColors =
  | "text"
  | "foreground"
  | "background"
  | "play"
  | "record";

export const themes: Record<ThemeNames, Record<ThemeColors, HexColor>> = {
  light: {
    text: "#282230",
    foreground: "#282230",
    background: "#f1f1f1",
    play: "#006600",
    record: "#ff0000",
  },
  dark: {
    text: "#f1f1f1",
    foreground: "#f1f1f1",
    background: "#27323a",
    play: "#006600",
    record: "#ff0000",
  },
};
