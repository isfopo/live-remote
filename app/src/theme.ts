export type ThemeNames = "light" | "dark";

export interface Theme {
  text: string;
  foreground: string;
  background: string;
}

export const themes: Record<ThemeNames, Theme> = {
  light: {
    text: "#282230",
    foreground: "#282230",
    background: "#f1f1f1",
  },
  dark: {
    text: "#f1f1f1",
    foreground: "#f1f1f1",
    background: "#27323a",
  },
};
