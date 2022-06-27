import { Alert, Snackbar } from "@mui/material";
import React, { useCallback } from "react";

export default function SnackBar({
  setOpenSnackBar,
  openSnackBar,
  snackBarSeverity,
  snackBarMessage,
}) {
  const handleClose = useCallback(
    (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpenSnackBar(false);
    },
    [setOpenSnackBar]
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={openSnackBar}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert
        severity={snackBarSeverity}
        sx={{ width: "30rem", fontSize: "1.4rem" }}
      >
        {snackBarMessage}
      </Alert>
    </Snackbar>
  );
}
