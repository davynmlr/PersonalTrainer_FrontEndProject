import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import type { TrainingWithCustomer } from "../types/training";
import { getTrainings, deleteTraining } from "../api/trainingsApi";
import { formatDateTime, formatFullName } from "../utils/formatters";
import ConfirmDialog from "./ConfirmDialog";

function TrainingList() {
  const [trainings, setTrainings] = useState<TrainingWithCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [trainingToDelete, setTrainingToDelete] =
    useState<TrainingWithCustomer | null>(null);

  const columns: GridColDef<TrainingWithCustomer>[] = [
    {
      field: "actions",
      headerName: "",
      width: 60,
      sortable: false,
      filterable: false,
      disableExport: true,
      renderCell: (params: GridRenderCellParams<TrainingWithCustomer>) => (
        <Tooltip title="Delete training">
          <IconButton onClick={() => setTrainingToDelete(params.row)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
      ),
    },
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
      .catch((err) => setMessage(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const handleDelete = () => {
    if (!trainingToDelete) return;

    deleteTraining(trainingToDelete.id)
      .then(() => {
        fetchTrainings();
        setMessage("Training deleted");
      })
      .catch((err) => setMessage(err.message));
    setTrainingToDelete(null);
  };

  return (
    <>
      <div style={{ width: "100%", height: 600 }}>
        <DataGrid
          rows={trainings}
          columns={columns}
          loading={loading}
          autoPageSize
          showToolbar
          disableRowSelectionOnClick
        />
      </div>
      <ConfirmDialog
        open={trainingToDelete !== null}
        title="Delete training?"
        message={
          "Are you sure you want to delete " +
          (trainingToDelete?.activity ?? "") +
          " on " +
          formatDateTime(trainingToDelete?.date ?? null) +
          "?"
        }
        onConfirm={handleDelete}
        onCancel={() => setTrainingToDelete(null)}
      />
      <Snackbar
        open={message !== ""}
        message={message}
        autoHideDuration={3000}
        onClose={() => setMessage("")}
      />
    </>
  );
}

export default TrainingList;
