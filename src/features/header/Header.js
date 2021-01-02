import React, { useState } from "react";
import "./Header.css";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { logout } from "../login/userSlice";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

const Header = () => {
  const [input, setInput] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
  };

  return (
    <div className="header">
      <h1>Knower</h1>
      <div className="header_search">
        <SearchIcon />
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="search"
        />
      </div>
      <MenuIcon onClick={handleClick} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
