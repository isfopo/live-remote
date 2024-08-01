import { themes, type ThemeNames } from "../theme";

export const setRootColors = (theme: ThemeNames) => {
  for (let [prop, color] of Object.entries(themes[theme])) {
    document.documentElement.style.setProperty(`--theme-${prop}`, color);
  }
  document.documentElement.style.setProperty("--theme-name", theme);
};