import { useState, useEffect } from "react";
import type { Dayjs } from "dayjs";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import type { Customer } from "../types/customer";
import type { TrainingFormData } from "../types/training";
import { getCustomers } from "../api/customersApi";
import { addTraining } from "../api/trainingsApi";
import { formatFullName } from "../utils/formatters";
import {
  isTrainingFormValid,
  newTrainingForm,
  toTrainingData,
} from "../utils/trainingForm";
import TrainingForm from "./TrainingForm";

type AddTrainingDialogProps = {
  start: Dayjs; // date and time the user clicked in the calendar
  onClose: () => void;
  onAdded: () => void;
  showMessage: (message: string) => void;
};

// "New training" dialog of the calendar: the user also picks the customer
export default function AddTrainingDialog(props: AddTrainingDialogProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerUrl, setCustomerUrl] = useState("");
  const [loadError, setLoadError] = useState("");
  const [training, setTraining] = useState<TrainingFormData>(
    newTrainingForm(props.start),
  );

  useEffect(() => {
    getCustomers()
      .then((data) =>
        setCustomers(
          data.sort((a, b) => formatFullName(a).localeCompare(formatFullName(b))),
        ),
      )
      .catch((err) => setLoadError(err.message));
  }, []);

  const handleSubmit = () => {
    addTraining(toTrainingData(training, customerUrl))
      .then(() => {
        props.onAdded();
        props.showMessage("Training added");
      })
      .catch((err) => props.showMessage(err.message));
    props.onClose();
  };

  return (
    <Dialog open={true} onClose={props.onClose}>
      <DialogTitle>New Training</DialogTitle>
      <DialogContent>
        {loadError && <Alert severity="error">{loadError}</Alert>}
        <TextField
          id="training-customer"
          select
          required
          margin="dense"
          label="Customer"
          value={customerUrl}
          onChange={(e) => setCustomerUrl(e.target.value)}
          fullWidth
          variant="standard"
        >
          {customers.map((customer) => (
            <MenuItem key={customer._links.self.href} value={customer._links.self.href}>
              {formatFullName(customer)}
            </MenuItem>
          ))}
        </TextField>
        <TrainingForm training={training} setTraining={setTraining} />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          disabled={customerUrl === "" || !isTrainingFormValid(training)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
