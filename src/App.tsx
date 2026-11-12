import { useState } from "react";
import { Outlet } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import NavLinks from "./components/NavLinks";
import DarkModeToggle from "./components/DarkModeToggle";
import ResetDatabase from "./components/ResetDatabase";

function App() {
  const [resetCount, setResetCount] = useState(0);
  const [message, setMessage] = useState("");

  return (
    <Container maxWidth="lg">
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Personal Trainer
          </Typography>
          <NavLinks />
          <DarkModeToggle />
          <ResetDatabase
            onReset={() => setResetCount(resetCount + 1)}
            showMessage={setMessage}
          />
        </Toolbar>
      </AppBar>
      {/* A new key makes React create the page again, so it loads the data again */}
      <Outlet key={resetCount} />
      <Snackbar
        open={message !== ""}
        message={message}
        autoHideDuration={3000}
        onClose={() => setMessage("")}
      />
      <CssBaseline />
    </Container>
  );
}

export default App;
