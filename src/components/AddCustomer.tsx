import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import type { CustomerData } from "../types/customer";
import { emptyCustomer } from "../types/customer";
import { addCustomer } from "../api/customersApi";
import CustomerForm from "./CustomerForm";

type AddCustomerProps = {
  fetchCustomers: () => void;
  showMessage: (message: string) => void;
};

export default function AddCustomer(props: AddCustomerProps) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<CustomerData>(emptyCustomer);

  const handleClickOpen = () => {
    setCustomer(emptyCustomer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    addCustomer(customer)
      .then(() => {
        props.fetchCustomers();
        props.showMessage("Customer added");
      })
      .catch((err) => props.showMessage(err.message));
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
        <CustomerForm customer={customer} setCustomer={setCustomer} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            disabled={!customer.firstname || !customer.lastname}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
