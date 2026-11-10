import { useState, useEffect } from "react";
import {
  DataGrid,
  gridSortedRowIdsSelector,
  useGridApiRef,
} from "@mui/x-data-grid";
import type {
  GridColDef,
  GridCsvExportOptions,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import Snackbar from "@mui/material/Snackbar";
import type { Customer } from "../types/customer";
import { getCustomers, deleteCustomer } from "../api/customersApi";
import { formatFullName } from "../utils/formatters";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import ConfirmDialog from "./ConfirmDialog";

// CSV export: all customers (also the ones hidden by a search or filter).
// The button column is left out with disableExport.
const csvOptions: GridCsvExportOptions = {
  fileName: "customers",
  utf8WithBom: true, // so Excel shows ä and ö correctly
  getRowsToExport: ({ apiRef }) => gridSortedRowIdsSelector(apiRef),
};

function CustomerList() {
  const apiRef = useGridApiRef();
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
      disableExport: true,
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
      <Stack direction="row" spacing={1}>
        <AddCustomer fetchCustomers={fetchCustomers} showMessage={setMessage} />
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={() => apiRef.current?.exportDataAsCsv(csvOptions)}
          disabled={customers.length === 0}
        >
          Export CSV
        </Button>
      </Stack>
      <div style={{ width: "100%", height: 600, marginTop: 8 }}>
        <DataGrid
          apiRef={apiRef}
          slotProps={{
            toolbar: {
              csvOptions: csvOptions,
              printOptions: { disableToolbarButton: true },
            },
          }}
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
