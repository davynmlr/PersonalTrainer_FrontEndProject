import { useState } from "react";
import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { resetDatabase } from "../api/databaseApi";
import ConfirmDialog from "./ConfirmDialog";

type ResetDatabaseProps = {
  onReset: () => void; // called after a successful reset
  showMessage: (message: string) => void;
};

// "Reset data" button in the app bar
export default function ResetDatabase(props: ResetDatabaseProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleReset = () => {
    setConfirmOpen(false);
    setResetting(true);

    resetDatabase()
      .then(() => {
        props.onReset();
        props.showMessage("Database reset to the demo data");
      })
      .catch((err) => props.showMessage(err.message))
      .finally(() => setResetting(false));
  };

  return (
    <>
      <Button
        color="inherit"
        startIcon={<RestartAltIcon />}
        onClick={() => setConfirmOpen(true)}
        disabled={resetting}
      >
        {resetting ? "Resetting..." : "Reset data"}
      </Button>
      <ConfirmDialog
        open={confirmOpen}
        title="Reset the database?"
        message="All customers and trainings are replaced with the original demo data. Everything that was added, edited or deleted is lost. The API is shared, so this also affects other users."
        onConfirm={handleReset}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
