import { Link, Outlet } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function App() {
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
        </Toolbar>
      </AppBar>
      <Outlet />
      <CssBaseline />
    </Container>
  );
}

export default App;
