import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import type { Customer } from "../types/customer";
import { getCustomers } from "../api/customersApi";

function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const columns: GridColDef<Customer>[] = [
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
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <div style={{ width: "100%", height: 600 }}>
        <DataGrid
          rows={customers}
          columns={columns}
          getRowId={(row) => row._links.self.href}
          loading={loading}
          autoPageSize
          showToolbar
        />
      </div>
      <Snackbar
        open={error !== ""}
        message={error}
        autoHideDuration={5000}
        onClose={() => setError("")}
      />
    </>
  );
}

export default CustomerList;
