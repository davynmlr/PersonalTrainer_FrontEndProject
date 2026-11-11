import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useColorScheme } from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

// Moon/sun button in the app bar that switches between light and dark mode
function DarkModeToggle() {
  // mode: "light", "dark" or "system" (= follow the computer's setting)
  // systemMode: what the computer's setting is ("light" or "dark")
  const { mode, systemMode, setMode } = useColorScheme();

  // The mode that is really shown right now
  const currentMode = mode === "system" ? systemMode : mode;

  // On the very first render MUI does not know the mode yet
  if (!currentMode) {
    return null;
  }

  const isDark = currentMode === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <Tooltip title={label}>
      <IconButton
        color="inherit"
        aria-label={label}
        onClick={() => setMode(isDark ? "light" : "dark")}
      >
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default DarkModeToggle;
