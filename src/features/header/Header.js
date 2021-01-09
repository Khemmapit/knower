import React, { useState } from "react";
import "./Header.css";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { logout, selectUser } from "../login/userSlice";
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { chooseProfile } from "../profile/profileSlice";
import { auth } from "../../firebase";
import { userSearch } from "../searchResult/searchSlice";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [input, setInput] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);

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
    dispatch(
      userSearch({
        hashtag: input,
      })
    );
    history.replace(`/search:${input}`);
  };

  const handleKnower = () => {
    setInput("");
    history.replace("/");
    dispatch(
      userSearch({
        hashtag: null,
      })
    );
  };

  return (
    <div className="header">
      <h1 onClick={handleKnower}>Knower</h1>
      <LanguageSwitcher />
      <div className="header_search">
        <SearchIcon />
        <form>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="search"
          />
          <button type="submit" onClick={handleSearch}>
            submit
          </button>
        </form>
      </div>
      {/* MenuIcon */}
      <MenuIcon onClick={handleClick} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="menus"
      >
        <MenuItem onClick={handleProfile}>
          <div className="profile">
            <Avatar src={user.photoURL} />
            <p>{user.displayName}</p>
          </div>
        </MenuItem>
        <MenuItem>Setting</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
