import { createTheme } from "@mui/material/styles";

// The app has a light and a dark color scheme.
// The DarkModeToggle button switches between them with useColorScheme().
// MUI remembers the choice in localStorage, and the first time it uses the
// computer's own setting (light or dark).
export const theme = createTheme({
  colorSchemes: {
    light: true,
    dark: true,
  },
});
