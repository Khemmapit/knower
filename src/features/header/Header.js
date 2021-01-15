import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
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
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HeaderSearch from "./HeaderSearch";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
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

  const handleKnower = () => {
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
        <Grid container justify="space-between" alignItems="center">
          {/* Knower logo */}
          <Grid item xs={1} sm={2} md={2}>
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
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={7}
                  alignItems="center"
                  direction="row"
                  justify="flex-start"
                  className={styles.rootSearchXSOnClick}
                >
                  <Grid item xs={1} className={styles.arrowBackIconXS}>
                    <IconButton
                      onClick={() => setClickSearchIcon(false)}
                      style={{ color: "#de5c8e", padding: "5px" }}
                    >
                      <ArrowBackIosIcon style={{ fontSize: "20px" }} />
                    </IconButton>
                  </Grid>
                  <Grid item xs={10} fullWidth>
                    <HeaderSearch />
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid
                item
                xs={6}
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
              <HeaderSearch searchIconOnClick={true} />
            </Grid>
          )}

          {/* Menu */}
          {(!isXSmall || !clickSearchIcon) && (
            <Grid item sm={1} md={2}>
              {/* MenuIcon */}
              <IconButton
                onClick={handleClick}
                className={isXSmall ? styles.menuIconXS : styles.menuIcon}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          )}
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
