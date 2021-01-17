import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Proptypes from "prop-types";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const CompleteAlert = ({ alert, setAlert }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert("");
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={alert !== ""}
      autoHideDuration={6000}
      onClose={handleClose}
      message={alert}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <Close fontSize="small" />
        </IconButton>
      }
    />
  );
};

CompleteAlert.propTypes = {
  alert: Proptypes.bool,
  setAlert: Proptypes.func,
};

export default CompleteAlert;
