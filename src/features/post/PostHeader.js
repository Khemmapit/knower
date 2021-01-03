import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
import "./PostHeader.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";
import { chooseProfile } from "../profile/profileSlice";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const PostHeader = ({ username, photoURL, hashtag, email }) => {
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
      chooseProfile({
        photoURL: photoURL,
        email: email,
        displayName: username,
      })
    );
    history.replace(`/profile:${email}`);
    // email or displayName ???
  };

  return (
    <div className="postHeader">
      <div className="header__left">
        <Avatar src={photoURL} onClick={goToProfile} />
        <div className="header__leftDescription">
          <h3 onClick={goToProfile}>{username.split(" ")[0]}</h3>
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

PostHeader.propTypes = {
  username: PropTypes.string,
  photoURL: PropTypes.string,
  email: PropTypes.string,
  hashtag: PropTypes.array,
};
export default PostHeader;
