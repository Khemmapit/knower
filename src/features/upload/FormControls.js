import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Check from "@material-ui/icons/Check";
import { useHistory } from "react-router-dom";
import Proptypes from "prop-types";
import Close from "@material-ui/icons/Close";

const FormControls = ({ handleUpload }) => {
  const history = useHistory();

  const handleBack = () => {
    history.push("/");
  };

  return (
    <Grid container spacing={3} alignItems="center" direction="row">
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          endIcon={<Close />}
        >
          cancel
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          form="upload-form"
          value="Submit"
          endIcon={<Check />}
        >
          upload
        </Button>
      </Grid>
    </Grid>
  );
};

FormControls.propTypes = {
  handleUpload: Proptypes.func,
};

export default FormControls;
