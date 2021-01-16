import React from "react";
import { useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import indexStyles from "./indexStyle";

const UploadButton = () => {
  const styles = indexStyles();
  const history = useHistory();

  const handleUploadButton = () => {
    history.push("/upload");
  };

  return (
    <Fab
      className={styles.addButton}
      color="primary"
      aria-label="add"
      size="large"
      onClick={handleUploadButton}
    >
      <AddIcon />
    </Fab>
  );
};

export default UploadButton;
