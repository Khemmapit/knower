import React, { useEffect } from 'react';
import './App.css';
import { auth } from "./firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from './features/login/userSlice';
import Login from './features/login/Login';
import Header from "./features/header/Header";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser.emailVerified) {
        console.log(authUser);
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))
      } else {
        dispatch(logout())
      }
    })
  }, []);

  return (
    <div className="app">
      {user ? (
        <Router>
          <Switch>
            <Route path="/" >
              <Header />
              
              <h1>Knower User photo</h1>
              <img src={user.photo} />
            </Route>
            {/* Feed */}

            {/* SearchResult */}

            {/* Profile */}
          </Switch>
        </Router>
      )
        : (
          <Login />
        )
      }

    </div>
  );
}

export default App;
