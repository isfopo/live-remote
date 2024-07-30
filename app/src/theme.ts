export interface Theme {
  name: string;
  colors: {
    text: string;
    foreground: string;
    background: string;
  };
}

export const themes: Theme[] = [
  {
    name: "light",
    colors: {
      text: "#282230",
      foreground: "#282230",
      background: "#f1f1f1",
    },
  },
  {
    name: "dark",
    colors: {
      text: "#f1f1f1",
      foreground: "#f1f1f1",
      background: "#27323a",
    },
  },
];
