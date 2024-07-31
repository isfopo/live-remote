import { themes, type ThemeNames } from "../theme";

export const setRootColors = (theme: ThemeNames) => {
  for (let [prop, color] of Object.entries(themes[theme])) {
    let varString = `--theme-${prop}`;
    document.documentElement.style.setProperty(varString, color);
  }
  document.documentElement.style.setProperty("--theme-name", theme);
};
