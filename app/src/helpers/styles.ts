import { themes } from "../theme";
import { type ThemeNames } from "../theme/types";

export const setRootColors = (theme: ThemeNames) => {
  for (let [prop, color] of Object.entries(themes[theme])) {
    document.documentElement.style.setProperty(`--theme-${prop}`, color);
  }
  document.documentElement.style.setProperty("--theme-name", theme);
};
