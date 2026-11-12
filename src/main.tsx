import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import App from "./App.tsx";
import CustomerList from "./components/CustomerList.tsx";
import TrainingList from "./components/TrainingList.tsx";
import TrainingCalendar from "./components/TrainingCalendar.tsx";
import TrainingStatistics from "./components/TrainingStatistics.tsx";

// en-gb: weeks start on Monday in the calendar and the date picker
dayjs.locale("en-gb");

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Navigate to="/customers" replace /> },
        { path: "customers", element: <CustomerList /> },
        { path: "trainings", element: <TrainingList /> },
        { path: "calendar", element: <TrainingCalendar /> },
        { path: "statistics", element: <TrainingStatistics /> },
        { path: "*", element: <Navigate to="/customers" replace /> },
      ],
    },
  ],
  // The app runs in a sub folder on GitHub Pages (see vite.config.ts)
  { basename: import.meta.env.BASE_URL },
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  </StrictMode>,
);
