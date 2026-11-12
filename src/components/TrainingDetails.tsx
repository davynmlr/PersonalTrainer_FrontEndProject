import { useState } from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import type { TrainingWithCustomer } from "../types/training";
import { formatDateTime, formatFullName } from "../utils/formatters";
import ConfirmDialog from "./ConfirmDialog";

type TrainingDetailsProps = {
  training: TrainingWithCustomer;
  color: string;
  onClose: () => void;
  onDelete: () => void;
};

export default function TrainingDetails(props: TrainingDetailsProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const training = props.training;
  const endTime = dayjs(training.date).add(training.duration, "minute").format("HH:mm");

  return (
    <>
      <Dialog open={true} onClose={props.onClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ borderLeft: 6, borderColor: props.color }}>
          {training.activity}
        </DialogTitle>
        <DialogContent>
          <Typography>
            <b>Customer:</b> {formatFullName(training.customer) || "Unknown"}
          </Typography>
          <Typography>
            <b>Date:</b> {formatDateTime(training.date)} – {endTime}
          </Typography>
          <Typography>
            <b>Duration:</b> {training.duration} min
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" startIcon={<DeleteIcon />} onClick={() => setConfirmOpen(true)}>
            Delete
          </Button>
          <Button onClick={props.onClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete training?"
        message={
          "Are you sure you want to delete " +
          training.activity +
          " on " +
          formatDateTime(training.date) +
          "?"
        }
        onConfirm={props.onDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
