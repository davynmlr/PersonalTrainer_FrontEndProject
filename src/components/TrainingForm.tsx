import React from "react";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import type { TrainingFormData } from "../types/training";

type TrainingFormProps = {
  training: TrainingFormData;
  setTraining: React.Dispatch<React.SetStateAction<TrainingFormData>>;
};

function TrainingForm({ training, setTraining }: TrainingFormProps) {
  return (
    <>
      <DateTimePicker
        label="Date"
        value={training.date}
        onChange={(value) => setTraining({ ...training, date: value })}
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
        value={training.activity}
        onChange={(e) => setTraining({ ...training, activity: e.target.value })}
        fullWidth
        variant="standard"
      />
      <TextField
        required
        margin="dense"
        label="Duration (min)"
        type="number"
        value={training.duration}
        onChange={(e) => setTraining({ ...training, duration: e.target.value })}
        fullWidth
        variant="standard"
      />
    </>
  );
}

export default TrainingForm;
