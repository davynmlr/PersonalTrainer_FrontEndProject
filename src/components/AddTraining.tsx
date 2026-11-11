import { useState } from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import type { Customer } from "../types/customer";
import type { TrainingFormData } from "../types/training";
import { addTraining } from "../api/trainingsApi";
import { formatFullName } from "../utils/formatters";
import {
  isTrainingFormValid,
  newTrainingForm,
  toTrainingData,
} from "../utils/trainingForm";
import TrainingForm from "./TrainingForm";

type AddTrainingProps = {
  customer: Customer;
  showMessage: (message: string) => void;
};

export default function AddTraining(props: AddTrainingProps) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState<TrainingFormData>(
    newTrainingForm(dayjs()),
  );

  const handleClickOpen = () => {
    setTraining(newTrainingForm(dayjs()));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    addTraining(toTrainingData(training, props.customer._links.self.href))
      .then(() => props.showMessage("Training added"))
      .catch((err) => props.showMessage(err.message));
    handleClose();
  };

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
          <TrainingForm training={training} setTraining={setTraining} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!isTrainingFormValid(training)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
