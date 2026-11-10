import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import type { Customer } from "../types/customer";
import { getCustomers, deleteCustomer } from "../api/customersApi";
import { formatFullName } from "../utils/formatters";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import ConfirmDialog from "./ConfirmDialog";

function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(
    null,
  );

  const columns: GridColDef<Customer>[] = [
    {
      field: "actions",
      headerName: "",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<Customer>) => (
        <>
          <EditCustomer
            fetchCustomers={fetchCustomers}
            showMessage={setMessage}
            customerData={params.row}
          />
          <AddTraining customer={params.row} showMessage={setMessage} />
          <Tooltip title="Delete customer">
            <IconButton onClick={() => setCustomerToDelete(params.row)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
    { field: "firstname", headerName: "First name", flex: 1 },
    { field: "lastname", headerName: "Last name", flex: 1 },
    { field: "streetaddress", headerName: "Street address", flex: 1 },
    { field: "postcode", headerName: "Postcode" },
    { field: "city", headerName: "City" },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
  ];

  const fetchCustomers = () => {
    getCustomers()
      .then((data) => setCustomers(data))
      .catch((err) => setMessage(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = () => {
    if (!customerToDelete) return;

    deleteCustomer(customerToDelete._links.self.href)
      .then(() => {
        fetchCustomers();
        setMessage("Customer deleted");
      })
      .catch((err) => setMessage(err.message));
    setCustomerToDelete(null);
  };

  return (
    <>
      <AddCustomer fetchCustomers={fetchCustomers} showMessage={setMessage} />
      <div style={{ width: "100%", height: 600, marginTop: 8 }}>
        <DataGrid
          rows={customers}
          columns={columns}
          getRowId={(row) => row._links.self.href}
          loading={loading}
          autoPageSize
          showToolbar
          disableRowSelectionOnClick
        />
      </div>
      <ConfirmDialog
        open={customerToDelete !== null}
        title="Delete customer?"
        message={
          "Are you sure you want to delete " +
          formatFullName(customerToDelete) +
          "? All their trainings will be deleted too."
        }
        onConfirm={handleDelete}
        onCancel={() => setCustomerToDelete(null)}
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

export default CustomerList;
