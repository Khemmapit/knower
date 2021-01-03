import React from "react";
import Video from "../video/Video";
import "./PostBody.css";

const PostBody = ({ videoURL }) => {
  return (
    <div className="postBody">
      <Video url={videoURL} />
    </div>
  );
};

export default PostBody;
