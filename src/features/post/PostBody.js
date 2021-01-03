import React from "react";
import Video from "../video/Video";
import "./PostBody.css";
import PropTypes from "prop-types";

const PostBody = ({ videoURL }) => {
  return (
    <div className="postBody">
      <Video url={videoURL} />
    </div>
  );
};

PostBody.propTypes = {
  videoURL: PropTypes.string,
};
export default PostBody;
