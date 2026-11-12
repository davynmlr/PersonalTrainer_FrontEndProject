import { createTheme } from "@mui/material/styles";

// Light and dark schemes; MUI stores the choice and defaults to the system setting.
export const theme = createTheme({
  colorSchemes: {
    light: true,
    dark: true,
  },
});
