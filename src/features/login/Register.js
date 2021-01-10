import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import "./Register.css";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@material-ui/core";
import db, { auth } from "../../firebase";

export default function Register() {
  {
    /* Register popup state */
  }
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const submitRegister = () => {
    if (name == "" || lastName == "" || email == "" || password == "") {
      return alert("กรุณาเติมข้อมูลในช่องว่างให้ครบ");
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userAuth) => {
          const userData = userAuth.user;
          userData.updateProfile({
            displayName: name + " " + lastName,
            photoURL: "",
          });
          userData
            .sendEmailVerification()
            .then(() => {
              console.log("Email verification was sent !");
            })
            .catch((error) => alert(error.message));
          console.log(userData);
          db.collection("user")
            .doc(userData.uid)
            .set({
              displayName: name + " " + lastName,
              email: userData.email,
              photoURL: "",
              uid: userData.uid,

              purpose: purpose,
              description: "",
            });
          db.collection("follow").doc(userData.uid).set({
            follower: [],
            following: [],
          });
        })
        .catch((error) => alert(error.message));

      handleClose();
    }
  };
  {
    /* Information state */
  }
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [purpose, setPurpose] = useState("");
  {
    /* Birth Date state */
  }
  const [birthDate, setBirthDate] = useState("2000-01-31");
  {
    /*Gender state*/
  }
  const [gender, setGender] = useState("หญิง");

  // Function to handle event
  const handleBirthDate = (event) => {
    console.log(event.target.value);
    setBirthDate(event.target.value);
  };

  return (
    <div className="register">
      <Button className="register__button" onClick={handleClickOpen}>
        สมัครสมาชิก
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <CloseIcon className="closeIcon" onClick={handleClose} />
        <DialogTitle id="register-form">สมัครสมาชิก</DialogTitle>
        <DialogContent>
          {/* name,lastname*/}
          <div className="register__fullname">
            <TextField
              margin="dense"
              label="ชื่อ"
              type="text"
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              margin="dense"
              label="นามสกุล"
              type="text"
              fullWidth
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          {/* email , password */}
          <TextField
            margin="dense"
            label="อีเมล"
            type="email"
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            margin="dense"
            label="รหัสผ่าน"
            type="password"
            fullWidth
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextField
            margin="dense"
            label="เป้าหมายในชีวิต (ตัวเลือก) "
            type="text"
            fullWidth
            value={purpose}
            onChange={(event) => setPurpose(event.target.value)}
          />

          {/* Date Picker from Materials UI */}
          <form className="" noValidate>
            <TextField
              id="date"
              label="วันเกิด"
              type="date"
              defaultValue="2000-01-31"
              value={birthDate}
              className=""
              onChange={handleBirthDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>

          <div className="gender">
            <FormControl>
              <FormLabel>เพศ</FormLabel>
              <RadioGroup
                aria-label="gender"
                value={gender}
                onChange={(event) => setGender(event.target.value)}
              >
                <div>
                  <FormControlLabel
                    value="หญิง"
                    control={<Radio />}
                    label="หญิง"
                  />
                  <FormControlLabel
                    value="ชาย"
                    control={<Radio />}
                    label="ชาย"
                  />
                  <FormControlLabel
                    value="อื่นๆ"
                    control={<Radio />}
                    label="อื่นๆ"
                  />
                </div>
              </RadioGroup>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitRegister}>สมัครสมาชิก</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
