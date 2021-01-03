import React, { useRef, useState } from "react";
import "./Video.css";
import PropTypes from "prop-types";

const Video = ({ url }) => {
  const [play, setPlay] = useState(false);
  const videoRef = useRef(null);

  const onVideoPress = () => {
    if (play) {
      videoRef.current.pause();
      setPlay(false);
    } else {
      videoRef.current.play();
      setPlay(true);
    }
  };

  return (
    <div className="video">
      <video
        className="video__player"
        ref={videoRef}
        onClick={onVideoPress}
        controls
        src={url}
      ></video>
    </div>
  );
};

Video.propTypes = {
  url: PropTypes.string,
};
export default Video;
