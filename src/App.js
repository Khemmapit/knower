import React, { useEffect, useState } from "react";
import "./App.css";
import { auth } from "./firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/login/userSlice";
import Login from "./features/login/Login";
import Header from "./features/header/Header";
import Profile from "./features/profile/Profile";
import { selectProfile } from "./features/profile/profileSlice";
import Feed from "./features/feed/Feed";
import SearchResult from "./features/searchResult/SearchResult";
import { selectSearch } from "./features/searchResult/searchSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const search = useSelector(selectSearch);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      setLoading(false);
      if (authUser.emailVerified) {
        if (authUser.photoURL === null) {
          console.log("get in photoURL");
          authUser.updateProfile({
            photoURL:
              "https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd",
          });
        }
        if (authUser.displayName === null) {
          console.log("get in displayName");
          authUser.updateProfile({
            displayName: authUser.email.split("@")[0],
          });
        }
        dispatch(
          login({
            uid: authUser.uid,
            photoURL: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <div className="app">
      {user ? (
        <Router>
          <Switch>
            {/* SearchResult */}
            <Route path={`/search:${search?.hashtag}`}>
              <Header />
              <div className="app__body">
                <SearchResult />
              </div>
            </Route>

            {/* Profile */}
            <Route path={`/profile:${profile?.email}`}>
              <Header />
              <div className="app__body">
                <Profile />
              </div>
            </Route>

            {/* Feed */}
            <Route path="/">
              <Header />
              <div className="app__body">
                <Feed />
              </div>
            </Route>
          </Switch>
        </Router>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
