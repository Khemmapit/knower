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
import Loading from "./features/loading";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./config/theme";
import Upload from "./features/upload";

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

  if (loading) return <Loading />;
  if (!user) return <Login />;
  return (
    <div className="app">
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            {/* SearchResult */}
            <Route path={`/search:${search?.hashtag}`}>
              <Header />
              <SearchResult />
            </Route>

            {/* Profile */}
            <Route path={`/profile:${profile?.email}`}>
              <Header />
              <Profile />
            </Route>

            {/* Profile */}
            <Route path="/upload">
              <Header />
              <Upload />
            </Route>

            {/* Feed */}
            <Route path="/">
              <Header />
              <Feed />
            </Route>
          </Switch>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
