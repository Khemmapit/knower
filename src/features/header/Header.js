import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { logout, selectUser } from "../login/userSlice";
import {
  AppBar,
  Avatar,
  Toolbar,
  Typography,
  Grid,
  Paper,
  InputBase,
  IconButton,
  useMediaQuery,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { chooseProfile } from "../profile/profileSlice";
import { selectSearch, userSearch } from "../searchResult/searchSlice";
import { auth } from "../../firebase";
import useStyles from "./HeaderStyles";
import { useTheme } from "@material-ui/core/styles";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const Header = () => {
  const [input, setInput] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const search = useSelector(selectSearch);
  const theme = useTheme();
  const styles = useStyles();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isXSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const [clickSearchIcon, setClickSearchIcon] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setAnchorEl(null);
        dispatch(logout());
        history.replace("/");
      })
      .then()
      .catch((error) => {
        throw error;
      });
  };
  const handleProfile = () => {
    dispatch(
      chooseProfile({
        uid: user.uid,
        photoURL: user.photoURL,
        email: user.email,
        displayName: user.displayName,
      })
    );
    history.replace(`/profile:${user.email}`);
    setAnchorEl(null);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    if (!input) {
      dispatch(
        userSearch({
          hashtag: input,
        })
      );
      history.replace(`/search:${input}`);
    }
  };

  const handleKnower = () => {
    setInput("");
    setClickSearchIcon(false);
    history.replace("/");
    dispatch(
      userSearch({
        hashtag: null,
      })
    );
  };

  return (
    <AppBar position="fixed" className={styles.header}>
      <Toolbar>
        <Grid container spacing={3} justify="space-between" alignItems="center">
          {/* Knower logo */}
          <Grid item xs={1} sm={1} md={2}>
            {isSmall ? (
              isXSmall ? (
                !clickSearchIcon && (
                  <Typography
                    variant="h6"
                    color="initial"
                    onClick={handleKnower}
                    className={`${styles.appLogo} ${styles.appLogoXS}`}
                  >
                    Knower
                  </Typography>
                )
              ) : (
                <Typography
                  variant="h5"
                  color="initial"
                  onClick={handleKnower}
                  className={styles.appLogo}
                >
                  Knower
                </Typography>
              )
            ) : (
              <Typography
                variant="h4"
                color="initial"
                onClick={handleKnower}
                className={styles.appLogo}
              >
                Knower
              </Typography>
            )}
          </Grid>

          {/* Search information*/}
          {isXSmall ? (
            clickSearchIcon ? (
              <Grid item xs={8} className={styles.rootSearchXSOnClick}>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  direction="row"
                  justify="start"
                >
                  <Grid item xs={2}>
                    <IconButton
                      onClick={() => setClickSearchIcon(false)}
                      className={styles.arrowBackIconXS}
                    >
                      <KeyboardBackspaceIcon />
                    </IconButton>
                  </Grid>

                  <Grid item xs={10}>
                    <Paper component="form" className={styles.rootSearchXS}>
                      <InputBase
                        className={styles.inputSearchXS}
                        placeholder="Search on Knower"
                        inputProps={{ "aria-label": "search google maps" }}
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                      />
                      <IconButton
                        type="submit"
                        className={styles.iconButtonSeach}
                        aria-label="search"
                        onClick={handleSearch}
                      >
                        <SearchIcon />
                      </IconButton>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid
                item
                xs={7}
                className={styles.iconButtonSeachXS}
                onClick={() => setClickSearchIcon(true)}
              >
                <IconButton type="submit" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Grid>
            )
          ) : (
            <Grid item sm={7} md={6}>
              <Paper component="form" className={styles.rootSearch}>
                <InputBase
                  className={styles.inputSearch}
                  placeholder={`${isSmall ? "Search" : "Search on Knower"}`}
                  inputProps={{ "aria-label": "search google maps" }}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                />
                <IconButton
                  type="submit"
                  className={styles.iconButtonSeach}
                  aria-label="search"
                  onClick={handleSearch}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
          )}

          {/* Menu */}
          <Grid item xs={1} sm={2} md={2}>
            {/* MenuIcon */}
            <IconButton
              onClick={handleClick}
              className={isXSmall ? styles.menuIconXS : styles.menuIcon}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          className={isXSmall && styles.menuXS}
        >
          <Grid
            container
            spacing={1}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item className={styles.menuItem}>
              <MenuItem onClick={handleProfile}>
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  spacing={1}
                  direction="row"
                >
                  <Grid item>
                    <Avatar src={user.photoURL} />
                  </Grid>

                  <Grid item>
                    <Typography
                      variant="h6"
                      color="initial"
                      className={styles.menuUsername}
                    >
                      {user.displayName}
                    </Typography>
                  </Grid>
                </Grid>
              </MenuItem>
            </Grid>

            <Grid item className={styles.menuItem}>
              <MenuItem>Setting</MenuItem>
            </Grid>

            <Grid item className={styles.menuItem}>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Grid>
          </Grid>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
