import React, { useEffect, useState } from "react";
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
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  app: {
    backgroundColor: "#f9f9f9",
    overflowX: "hidden",
  },
  appBody: {
    paddingTop: "70px",
    width: "100vw",
  },
}));

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const styles = useStyles();
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
    <Grid container direction="column" className={styles.app}>
      {user ? (
        <Router>
          <Switch>
            {/* SearchResult */}
            <Route path={`/search:${search?.hashtag}`}>
              <Grid item>
                <Header />
              </Grid>
              <Grid item className={styles.appBody}>
                <SearchResult />
              </Grid>
            </Route>

            {/* Profile */}
            <Route path={`/profile:${profile?.email}`}>
              <Grid item xs={12}>
                <Header />
              </Grid>
              <Grid item className={styles.appBody} xs={12}>
                <Profile />
              </Grid>
            </Route>

            {/* Feed */}
            <Route path="/">
              <Grid item>
                <Header />
              </Grid>
              <Grid item className={styles.appBody}>
                <Feed />
              </Grid>
            </Route>
          </Switch>
        </Router>
      ) : (
        <Login />
      )}
    </Grid>
  );
}

export default App;
