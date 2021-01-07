import {
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Login.css";
import { auth, googleProvider, facebookProvider } from "../../firebase";
import Register from "./Register";
import db from "../../firebase";
import { useDispatch } from "react-redux";
import { login } from "./userSlice";

const Login = () => {
  // tools for control
  const dispatch = useDispatch();

  // Internal state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [forgetEmail, setForgetEmail] = useState("");
  const [userUid, setUserUid] = useState([]);

  useEffect(() => {
    db.collection("user")
      .get()
      .then((snapshot) =>
        snapshot.forEach((doc) => setUserUid(...userUid, doc.data().uid))
      );
  }, []);

  const signInWithEmail = (event) => {
    // Login with email and password
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        console.log(userAuth);
        if (userAuth.user.emailVerified) {
          dispatch(
            login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
              displayName: userAuth.user.displayName,
              photoURL: userAuth.user.photoURL,
            })
          );
        } else {
          alert(`Please verify your email : ${userAuth.user.email}`);
        }
      })
      .catch((error) =>
        alert("email or password false or don't have these in our system.")
      );
  };

  const addNewUserToDB = (user) => {
    db.collection("user").doc(user.uid).set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      purpose: "",
      description: "",
    });
    db.collection("follow").doc(user.uid).set({
      follower: [],
      following: [],
    });
  };

  const signInWithGoogle = () => {
    //Login with Google
    auth
      .signInWithPopup(googleProvider)
      .then((userAuth) => {
        console.log(userAuth);
        const user = userAuth.user;
        dispatch(
          login({
            uid: user.uid,
            photoURL: user.photoURL,
            email: user.email,
            displayName: user.displayName,
          })
        );
        if (userAuth.additionalUserInfo.isNewUser) {
          console.log("is new user !");
          addNewUserToDB(user);
        }
      })
      .catch((error) => alert(error.message));
  };

  const signInWithFacebook = () => {
    //Login with Facebook
    auth
      .signInWithPopup(facebookProvider)
      .then((userAuth) => {
        console.log(userAuth);
        const user = userAuth.user;
        dispatch(
          login({
            uid: user.uid,
            photoURL: user.photoURL,
            email: user.email,
            displayName: user.displayName,
          })
        );
        if (userAuth.additionalUserInfo.isNewUser) {
          addNewUserToDB(user);
        }
      })
      .catch((error) => alert(error.message));
  };

  const validateEmail = (email) => {
    if (email === null || email === "") {
      return false;
    } else {
      if (email.includes("@")) {
        // will code more in the future
        return true;
      } else {
        return false;
      }
    }
  };

  const handleSubmitForgetEmail = async () => {
    // control to send password of forgetEmail to forgetEmail address.
    if (validateEmail(forgetEmail)) {
      await alert("Send your password to your email now!");
    } else {
      await alert("Your email address pattern is false !.");
    }
  };

  const handleForget = () => {
    // set open state to open/close ลืมรหัสผ่าน? dialog
    if (open) {
      if (forgetEmail !== "") {
        handleSubmitForgetEmail();
        setForgetEmail("");
        setOpen(false);
      } else {
        setOpen(false);
      }
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="login">
      <div className="login_left">
        <h1>Knower</h1>
        <p>
          Knower ช่วยให้เรื่องที่คุณอยากเรียนรู้เป็นเรื่องที่ สั้น กระชับ
          และได้ใจความ
        </p>
      </div>
      <div className="login_right">
        <div className="login_box">
          <form className="login_boxDefault">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
            <Button type="submit" onClick={signInWithEmail}>
              เข้าสู่ระบบ
            </Button>
          </form>
          {/* send password to user email */}
          <p onClick={handleForget}>ลืมรหัสผ่าน ?</p>
          <Dialog
            open={open}
            onClose={handleForget}
            aria-labelledby="forget-dialog"
          >
            <DialogTitle id="forget-dialog">ลืมรหัสผ่าน ?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                ทาง Knower จะส่ง password สำหรับการเข้าสู่ระบบด้วย email ไปยัง
                email ของคุณที่ใส่ใน email address ด้านล่างนี้
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                value={forgetEmail}
                onChange={(event) => setForgetEmail(event.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleForget} color="primary">
                ยืนยัน
              </Button>
            </DialogActions>
          </Dialog>
          {/* Login with other provider (facebook,google) */}
          <div className="login_boxProvider">
            <button onClick={signInWithGoogle}>
              <span>
                <img src="https://i.pinimg.com/originals/39/21/6d/39216d73519bca962bd4a01f3e8f4a4b.png" />
                <p>เข้าสู่ระบบด้วย Google</p>
              </span>
            </button>
            <button onClick={signInWithFacebook}>
              <span>
                <img src="https://iconape.com/wp-content/files/yd/117914/svg/Facebook_f_logo__2019_.svg" />
                <p>เข้าสู่ระบบด้วย Facebook</p>
              </span>
            </button>
          </div>
          <hr />
          <Register />
        </div>
      </div>
    </div>
  );
};

export default Login;
