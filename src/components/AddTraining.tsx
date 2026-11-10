import { useState } from "react";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import type { Customer } from "../types/customer";
import { addTraining } from "../api/trainingsApi";
import { formatFullName } from "../utils/formatters";

type AddTrainingProps = {
  customer: Customer;
  showMessage: (message: string) => void;
};

export default function AddTraining(props: AddTrainingProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");

  const handleClickOpen = () => {
    setDate(dayjs());
    setActivity("");
    setDuration("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (!date) return;

    addTraining({
      date: date.toISOString(),
      activity: activity,
      duration: parseInt(duration),
      customer: props.customer._links.self.href,
    })
      .then(() => props.showMessage("Training added"))
      .catch((err) => props.showMessage(err.message));
    handleClose();
  };

  const isValid =
    date !== null && date.isValid() && activity !== "" && parseInt(duration) > 0;

  return (
    <>
      <Tooltip title="Add training">
        <IconButton color="primary" onClick={handleClickOpen}>
          <FitnessCenterIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          New Training for {formatFullName(props.customer)}
        </DialogTitle>
        <DialogContent>
          <DateTimePicker
            label="Date"
            value={date}
            onChange={(value) => setDate(value)}
            format="DD.MM.YYYY HH:mm"
            ampm={false}
            slotProps={{
              textField: { required: true, fullWidth: true, margin: "dense" },
            }}
          />
          <TextField
            required
            margin="dense"
            label="Activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            label="Duration (min)"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!isValid}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
