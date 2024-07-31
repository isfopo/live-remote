<script>
  import { setContext, onMount } from "svelte";
  import { writable } from "svelte/store";
  import { themes as _themes } from "../theme";

  export let themes = [..._themes];
  let _current = themes[0].name;

  const getCurrentTheme = (name) => themes.find((h) => h.name === name);
  const Theme = writable(getCurrentTheme(_current));

  setContext("theme", {
    theme: Theme,
    toggle: () => {
      let _currentIndex = themes.findIndex((h) => h.name === _current);
      _current =
        themes[_currentIndex === themes.length - 1 ? 0 : (_currentIndex += 1)]
          .name;
      Theme.update((t) => ({ ...t, ...getCurrentTheme(_current) }));
      setRootColors(getCurrentTheme(_current));

      // Save the current theme to localStorage
      localStorage.setItem("currentTheme", _current);
    },
  });

  onMount(() => {
    // Load theme from localStorage or fallback to prefers-color-scheme
    const savedTheme = localStorage.getItem("currentTheme");
    if (savedTheme && getCurrentTheme(savedTheme)) {
      _current = savedTheme;
    } else {
      const defaultTheme =
        getCurrentTheme(
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
        ) || themes[0];

      _current = defaultTheme.name;
    }

    Theme.set(getCurrentTheme(_current));
    setRootColors(getCurrentTheme(_current));
  });

  const setRootColors = (theme) => {
    for (let [prop, color] of Object.entries(theme.colors)) {
      let varString = `--theme-${prop}`;
      document.documentElement.style.setProperty(varString, color);
    }
    document.documentElement.style.setProperty("--theme-name", theme.name);
  };
</script>

<slot>
  <!-- content will go here -->
</slot>
