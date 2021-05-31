import { makeStyles, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(10),
  },
}));
const Notification = (props) => {
  const classes = useStyles();

  const { notify, setNotify } = props;
  const handleCloseAlert = (event, reason) => {
    if (reason == "clickaway") {
      return; //This  is to avoid closing snackbar when clicked on outside snackbar
    }
    setNotify({ alertMessage: "", alertType: "", isOpen: false });
  };

  return (
    <Snackbar
      className={classes.root}
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleCloseAlert}
    >
      <Alert severity={notify.alertType} onClose={handleCloseAlert}>
        {notify.alertMessage}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
