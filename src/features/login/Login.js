import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./Login.css";
import { auth, googleProvider, facebookProvider } from "../../firebase";
import Register from "./Register";
import db from "../../firebase";
import { useDispatch } from "react-redux";
import { login } from "./userSlice";
import Loading from "../loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const signInWithEmail = (event) => {
    // Login with email and password
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then((userAuth) => {
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
    });
  };

  const addNewUserToDB = (user) => {
    // This function try to add new user data to databases at "user" collection
    const userEmail = [];
    db.collection("user")
      .get()
      .then((snapshot) =>
        snapshot.forEach((doc) => userEmail.push(doc.data().email))
      );
    const check = userEmail.find((element) => element == user.email);
    if (!check) {
      console.log("get in", userEmail);
      db.collection("user").doc(user.email).update({
        content: 0,
        displayName: user.displayName,
        email: user.email,
        follower: 0,
        following: 0,
        photoURL: user.photoURL,
        uid: user.uid,
      });
    }
  };

  const signInWithGoogle = () => {
    // Login with Google
    setLoading(true);
    auth
      .signInWithPopup(googleProvider)
      .then(({ user }) => {
        dispatch(
          login({
            uid: user.uid,
            photoURL: user.photoURL,
            email: user.email,
            displayName: user.displayName,
          })
        );
        addNewUserToDB(user);
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      });
  };

  const signInWithFacebook = () => {
    // Login with Facebook
    auth
      .signInWithPopup(facebookProvider)
      .then(({ user }) => {
        dispatch(
          login({
            uid: user.uid,
            photoURL: user.photoURL,
            email: user.email,
            displayName: user.displayName,
          })
        );
        addNewUserToDB(user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  if (loading) return <Loading />;
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
          <div className="login_boxDefault">
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
          </div>
          <p>ลืมรหัสผ่าน ?</p>
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
