import { Avatar, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import "./PostHeader.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../login/userSlice";
import { choose_profile } from "../profile/profileSlice";
import { Link, useHistory } from "react-router-dom";
import { user_search } from "../searchResult/searchSlice";

const PostHeader = ({ username, photoURL, hashtag, email, uid }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSearch = (hash) => {
    dispatch(
      user_search({
        hashtag: hash,
      })
    );
    history.replace(`/search:${hash}`);
  };

  const goToProfile = () => {
    dispatch(
      choose_profile({
        photoURL: photoURL,
        email: email,
        displayName: username,
        uid: uid,
      })
    );
    history.replace(`/profile:${email}`);
    // email or displayName ???
  };

  return (
    <div className="postHeader">
      <div className="header__left">
        <Link to={`/profile:${email}`}>
          <Avatar src={photoURL} onClick={goToProfile} />
        </Link>
        <div className="header__leftDescription">
          <h3 onClick={goToProfile}>{username}</h3>
          <div className="description">
            {hashtag.map((hash, index) => (
              <small onClick={() => handleSearch(hash)} key={index}>
                #{hash}
              </small>
            ))}
          </div>
        </div>
      </div>
      <div className="header__right">
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default PostHeader;
