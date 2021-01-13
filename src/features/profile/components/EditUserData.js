import React, { useState } from "react";
import useStyles from "../ProfileStyles";
import firebase from "firebase";
import db from "../../../firebase";
import { login, selectUser } from "../../login/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  IconButton,
  TextField,
  Box,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const EditUserData = ({ userData, size, screen }) => {
  const styles = useStyles();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [description, setDescription] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const handleSubmitEdit = () => {
    if (description != "") {
      db.collection("user").doc(user.uid).update({
        description: description,
      });
    }
    if (displayName != "") {
      db.collection("user").doc(user.uid).update({
        displayName: displayName,
      });
    }
    if (photoURL != "") {
      db.collection("user").doc(user.uid).update({
        photoURL: photoURL,
      });
    }
    if (purpose != "") {
      db.collection("user").doc(user.uid).update({
        purpose: purpose,
      });
    }
    // update global state of userSlice
    firebase
      .auth()
      .currentUser.updateProfile({
        uid: userData.uid,
        photoURL: userData.photoURL,
        email: userData.email,
        displayName: userData.displayName,
      })
      .then((result) =>
        console.log("update profile success", firebase.auth().currentUser)
      );
    dispatch(
      login({
        uid: userData.uid,
        photoURL: userData.photoURL,
        email: userData.email,
        displayName: userData.displayName,
      })
    );
    setOpenEdit(false);
    setPhotoURL("");
    setDisplayName("");
    setDescription("");
    setPurpose("");
  };

  return (
    <>
      <IconButton
        onClick={() => setOpenEdit(true)}
        className={styles.editIcon}
        size={size}
      >
        <EditIcon />
      </IconButton>
      {/* Edit user data Dialog */}
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        aria-labelledby="edit-form"
        className={screen == "xs" && styles.editDialog}
      >
        <DialogTitle id="edit-form">Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Purpose"
            type="text"
            fullWidth
            value={purpose}
            onChange={(event) => setPurpose(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <TextField
            margin="dense"
            label="Display Name"
            type="text"
            fullWidth
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
          />
          <TextField
            margin="dense"
            label="PhotoURL"
            type="text"
            fullWidth
            value={photoURL}
            onChange={(event) => setPhotoURL(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitEdit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditUserData;
