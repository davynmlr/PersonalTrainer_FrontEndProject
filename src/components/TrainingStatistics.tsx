import { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import PeopleIcon from "@mui/icons-material/People";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ScheduleIcon from "@mui/icons-material/Schedule";
import StarIcon from "@mui/icons-material/Star";
import type { TrainingWithCustomer } from "../types/training";
import { getCustomers } from "../api/customersApi";
import { getTrainings } from "../api/trainingsApi";
import { getActivityColors } from "../utils/activityColors";
import {
  getMinutesByActivity,
  getMinutesByCustomer,
  getMostPopularActivity,
  getTotalHours,
} from "../utils/statistics";
import StatCard from "./StatCard";

function TrainingStatistics() {
  // Recharts does not use the MUI theme by itself, so the chart text, lines
  // and tooltip get their colors from the theme here (works in dark mode too)
  const theme = useTheme();
  const axisText = { fill: theme.palette.text.secondary };
  const valueText = { fill: theme.palette.text.primary };
  const gridColor = theme.palette.divider;
  const tooltipStyle = {
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.divider,
    color: theme.palette.text.primary,
  };

  const [customerCount, setCustomerCount] = useState(0);
  const [trainings, setTrainings] = useState<TrainingWithCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load customers and trainings at the same time
  useEffect(() => {
    Promise.all([getCustomers(), getTrainings()])
      .then(([customers, trainingData]) => {
        setCustomerCount(customers.length);
        setTrainings(trainingData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Everything below is calculated from the loaded data
  const minutesByActivity = getMinutesByActivity(trainings);
  const minutesByCustomer = getMinutesByCustomer(trainings);
  const colors = getActivityColors(trainings.map((training) => training.activity));
  // One row per customer, so the chart grows with the number of customers
  const customerChartHeight = Math.max(250, minutesByCustomer.length * 40 + 60);

  return (
    <>
      {/* Summary cards: as many per row as fit on the screen */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 2,
          mb: 2,
        }}
      >
        <StatCard label="Customers" value={customerCount} icon={<PeopleIcon />} />
        <StatCard label="Trainings" value={trainings.length} icon={<FitnessCenterIcon />} />
        <StatCard label="Total hours" value={getTotalHours(trainings)} icon={<ScheduleIcon />} />
        <StatCard
          label="Most popular activity"
          value={getMostPopularActivity(trainings)}
          icon={<StarIcon />}
        />
      </Box>

      {!loading && trainings.length === 0 && (
        <Typography color="text.secondary">No trainings yet.</Typography>
      )}

      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Minutes by activity</Typography>
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <BarChart data={minutesByActivity} margin={{ top: 24, right: 16, left: 16 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis dataKey="activity" tick={axisText} />
              <YAxis
                tick={axisText}
                label={{
                  value: "Duration (min)",
                  angle: -90,
                  position: "insideLeft",
                  ...axisText,
                }}
              />
              <Tooltip
                formatter={(value) => [value + " min", "Duration"]}
                contentStyle={tooltipStyle}
                cursor={{ fill: theme.palette.action.hover }}
              />
              <Bar dataKey="minutes">
                {/* Same color for each activity as in the calendar */}
                {minutesByActivity.map((row) => (
                  <Cell key={row.activity} fill={colors[row.activity]} />
                ))}
                <LabelList dataKey="minutes" position="top" {...valueText} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h6">Minutes by customer</Typography>
        <div style={{ width: "100%", height: customerChartHeight }}>
          <ResponsiveContainer>
            {/* layout="vertical": the bars go from left to right */}
            <BarChart
              data={minutesByCustomer}
              layout="vertical"
              margin={{ top: 16, right: 48, left: 16 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={gridColor} />
              <XAxis type="number" tick={axisText} />
              <YAxis type="category" dataKey="customer" width={150} tick={axisText} />
              <Tooltip
                formatter={(value) => [value + " min", "Duration"]}
                contentStyle={tooltipStyle}
                cursor={{ fill: theme.palette.action.hover }}
              />
              <Bar dataKey="minutes" fill="#1976d2">
                <LabelList dataKey="minutes" position="right" {...valueText} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Paper>

      <Snackbar
        open={error !== ""}
        message={error}
        autoHideDuration={5000}
        onClose={() => setError("")}
      />
    </>
  );
}

export default TrainingStatistics;
