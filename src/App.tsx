import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import ResetDatabase from "./components/ResetDatabase";

function App() {
  // Goes up by one after every database reset (see the Outlet below)
  const [resetCount, setResetCount] = useState(0);
  const [message, setMessage] = useState("");

  return (
    <Container maxWidth="lg">
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Personal Trainer
          </Typography>
          <Button color="inherit" component={Link} to="/customers">
            Customers
          </Button>
          <Button color="inherit" component={Link} to="/trainings">
            Trainings
          </Button>
          <Button color="inherit" component={Link} to="/calendar">
            Calendar
          </Button>
          <Button color="inherit" component={Link} to="/statistics">
            Statistics
          </Button>
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
