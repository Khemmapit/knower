import React, { useState } from "react";
import Video from "../video/Video";
import "./Content.css";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import LibraryAddOutlinedIcon from "@material-ui/icons/LibraryAddOutlined";
import { useHistory } from "react-router-dom";
import { userSearch } from "../searchResult/searchSlice";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

const Content = ({ url, description, hashtag }) => {
  const [getIt, setGetIt] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handelGetIt = () => {
    if (getIt) {
      setGetIt(false);
    } else {
      setGetIt(true);
    }
  };

  const goToSearch = (hash) => {
    dispatch(
      userSearch({
        hashtag: hash,
      })
    );
    history.replace(`/search:${hash}`);
  };

  return (
    <div className="subcontent">
      <div className="subcontent__hashtag">
        {hashtag.map((hash, index) => (
          <p key={index} onClick={() => goToSearch(hash)}>
            #{hash}
          </p>
        ))}
      </div>
      <div className="subcontent__video">
        <Video url={url} className="subcontent__video" />
      </div>
      <div className="action">
        <div
          className={`action__button ${getIt && "getIt__button__click"} `}
          onClick={handelGetIt}
        >
          <CheckCircleOutlineIcon />
          <p>get it !</p>
        </div>
        <div className="action__button recommend__button">
          <CommentOutlinedIcon />
          <p>recommend</p>
        </div>
        <div className="action__button collect__button">
          <LibraryAddOutlinedIcon />
          <p>collect</p>
        </div>
      </div>
      <div className="subcontent__description">
        <BookmarkBorderIcon />
        <p>{description}</p>
      </div>
    </div>
  );
};

Content.propTypes = {
  url: PropTypes.string,
  description: PropTypes.string,
  hashtag: PropTypes.array,
};

export default Content;
