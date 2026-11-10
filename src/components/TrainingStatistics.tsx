import { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import { getTrainings } from "../api/trainingsApi";
import { getMinutesByActivity } from "../utils/statistics";
import type { ActivityMinutes } from "../utils/statistics";

function TrainingStatistics() {
  const [data, setData] = useState<ActivityMinutes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getTrainings()
      .then((trainings) => setData(getMinutesByActivity(trainings)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Minutes by activity
      </Typography>
      {!loading && data.length === 0 && (
        <Typography color="text.secondary">No trainings yet.</Typography>
      )}
      <div style={{ width: "100%", height: 500 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 24, right: 16, left: 16 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="activity" />
            <YAxis
              label={{ value: "Duration (min)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip formatter={(value) => [value + " min", "Duration"]} />
            <Bar dataKey="minutes" fill="#1976d2">
              <LabelList dataKey="minutes" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
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
