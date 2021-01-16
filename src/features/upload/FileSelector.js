import React from "react";
import Button from "@material-ui/core/Button";
import Proptypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import indexStyle from "./indexStyles";
import AttachFile from "@material-ui/icons/AttachFile";

const FileSelector = ({ contentBlob, setContentBlob }) => {
  const styles = indexStyle();

  const handleUploadFileChange = (event) => {
    const fileObject = event.target.files[0];
    setContentBlob(fileObject);
  };

  return (
    <FormControlLabel
      control={
        <Button
          variant="contained"
          color="primary"
          component="label"
          endIcon={<AttachFile />}
        >
          select
          <input
            accept="video/*"
            hidden
            type="file"
            onChange={handleUploadFileChange}
            required
          />
        </Button>
      }
      label={
        <Typography className={styles.fileSelectorLabel}>
          {contentBlob ? contentBlob.name.slice(0, 15) : "No file"}
        </Typography>
      }
    />
  );
};

FileSelector.propTypes = {
  contentBlob: Proptypes.object,
  setContentBlob: Proptypes.func,
};
export default FileSelector;
