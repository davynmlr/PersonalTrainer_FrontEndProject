import React from "react";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import type { CustomerData } from "../types/customer";

type CustomerFormProps = {
  customer: CustomerData;
  setCustomer: React.Dispatch<React.SetStateAction<CustomerData>>;
};

function CustomerForm({ customer, setCustomer }: CustomerFormProps) {
  return (
    <DialogContent>
      <TextField
        required
        margin="dense"
        label="First name"
        value={customer.firstname}
        onChange={(e) => setCustomer({ ...customer, firstname: e.target.value })}
        fullWidth
        variant="standard"
      />
      <TextField
        required
        margin="dense"
        label="Last name"
        value={customer.lastname}
        onChange={(e) => setCustomer({ ...customer, lastname: e.target.value })}
        fullWidth
        variant="standard"
      />
      <TextField
        margin="dense"
        label="Street address"
        value={customer.streetaddress}
        onChange={(e) =>
          setCustomer({ ...customer, streetaddress: e.target.value })
        }
        fullWidth
        variant="standard"
      />
      <TextField
        margin="dense"
        label="Postcode"
        value={customer.postcode}
        onChange={(e) => setCustomer({ ...customer, postcode: e.target.value })}
        fullWidth
        variant="standard"
      />
      <TextField
        margin="dense"
        label="City"
        value={customer.city}
        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
        fullWidth
        variant="standard"
      />
      <TextField
        margin="dense"
        label="Email"
        type="email"
        value={customer.email}
        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
        fullWidth
        variant="standard"
      />
      <TextField
        margin="dense"
        label="Phone"
        value={customer.phone}
        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
        fullWidth
        variant="standard"
      />
    </DialogContent>
  );
}

export default CustomerForm;
