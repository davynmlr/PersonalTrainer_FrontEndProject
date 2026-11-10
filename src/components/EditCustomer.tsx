import { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import type { Customer, CustomerData } from "../types/customer";
import { emptyCustomer } from "../types/customer";
import { updateCustomer } from "../api/customersApi";
import CustomerForm from "./CustomerForm";

type EditCustomerProps = {
  fetchCustomers: () => void;
  showMessage: (message: string) => void;
  customerData: Customer;
};

export default function EditCustomer(props: EditCustomerProps) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<CustomerData>(emptyCustomer);

  const handleClickOpen = () => {
    setCustomer({
      firstname: props.customerData.firstname,
      lastname: props.customerData.lastname,
      streetaddress: props.customerData.streetaddress,
      postcode: props.customerData.postcode,
      city: props.customerData.city,
      email: props.customerData.email,
      phone: props.customerData.phone,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    updateCustomer(props.customerData._links.self.href, customer)
      .then(() => {
        props.fetchCustomers();
        props.showMessage("Customer updated");
      })
      .catch((err) => props.showMessage(err.message));
    handleClose();
  };

  return (
    <>
      <Tooltip title="Edit customer">
        <IconButton onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
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
