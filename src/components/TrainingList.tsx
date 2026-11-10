import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import type { TrainingWithCustomer } from "../types/training";
import { getTrainings } from "../api/trainingsApi";
import { formatDateTime, formatFullName } from "../utils/formatters";

function TrainingList() {
  const [trainings, setTrainings] = useState<TrainingWithCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const columns: GridColDef<TrainingWithCustomer>[] = [
    {
      field: "date",
      headerName: "Date",
      type: "dateTime",
      width: 160,
      // Use a Date so the column sorts by date, not as text
      valueGetter: (value: string) => new Date(value),
      valueFormatter: (value: Date) => formatDateTime(value),
    },
    { field: "activity", headerName: "Activity", flex: 1 },
    { field: "duration", headerName: "Duration (min)", type: "number", width: 140 },
    {
      field: "customer",
      headerName: "Customer",
      flex: 1,
      valueGetter: (_value, row) => formatFullName(row.customer),
    },
  ];

  const fetchTrainings = () => {
    getTrainings()
      .then((data) => setTrainings(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  return (
    <>
      <div style={{ width: "100%", height: 600 }}>
        <DataGrid
          rows={trainings}
          columns={columns}
          loading={loading}
          autoPageSize
          showToolbar
        />
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

export default TrainingList;
