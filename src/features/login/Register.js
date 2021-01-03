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
  InputLabel,
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
          userAuth.user.updateProfile({
            displayName: name + " " + lastName,
          });
          userAuth.user
            .sendEmailVerification()
            .then(() => {
              console.log("Email verification was sent !");
            })
            .catch((error) => alert(error.message));
          db.collection("user").doc(userAuth.email).set({
            content: 0,
            displayName: userAuth.displayName,
            email: userAuth.email,
            follower: 0,
            following: 0,
            photoURL: userAuth.photoURL,
            uid: userAuth.uid,
          });
        })
        .catch((error) => alert(error.message));
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
  const [day, setDay] = useState(1);
  const [openDay, setOpenDay] = useState(false);
  const days = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
  ];
  const [month, setMonth] = useState("มกราคม");
  const [openMonth, setOpenMonth] = useState(false);
  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];
  const [year, setYear] = useState(2020);
  const [openYear, setOpenYear] = useState(false);
  const years = [];
  for (let i = 2020; i > 1919; i--) {
    years.push(i);
  }
  {
    /* Gender state*/
  }
  const [gender, setGender] = useState("หญิง");

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
          {/* Birth Date */}
          <p className="birth_date_label">วันเกิด</p>
          <div className="birth_date">
            {/* day */}
            <FormControl>
              <InputLabel id="day-label">วัน</InputLabel>
              <Select
                labelId="day-balel"
                open={openDay}
                onClose={() => setOpenDay(false)}
                onOpen={() => setOpenDay(true)}
                value={day}
                onChange={(event) => setDay(event.target.value)}
              >
                {days.map((d, index) => (
                  <MenuItem key={index} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* month */}
            <FormControl>
              <InputLabel id="month-label">เดือน</InputLabel>
              <Select
                labelId="month-label"
                open={openMonth}
                onClose={() => setOpenMonth(false)}
                onOpen={() => setOpenMonth(true)}
                value={month}
                onChange={(event) => setMonth(event.target.value)}
              >
                {months.map((m, index) => (
                  <MenuItem key={index} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* year */}
            <FormControl>
              <InputLabel id="year-label">เดือน</InputLabel>
              <Select
                labelId="year-label"
                open={openYear}
                onClose={() => setOpenYear(false)}
                onOpen={() => setOpenYear(true)}
                value={year}
                onChange={(event) => setYear(event.target.value)}
              >
                {years.map((y, index) => (
                  <MenuItem key={index} value={y}>
                    {y}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

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
