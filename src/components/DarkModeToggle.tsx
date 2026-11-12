import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useColorScheme } from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

function DarkModeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();

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
