import React from "react";
import "./Post.css";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import PostBody from "./PostBody";
import PropTypes from "prop-types";

const Post = ({ username, photoURL, description, email, hashtag }) => {
  return (
    <div className="post">
      <PostHeader
        className="post__header"
        username={username}
        photoURL={photoURL}
        email={email}
        hashtag={hashtag}
      />
      <PostBody
        className="post__body"
        videoURL="https://v16-web.tiktok.com/video/tos/useast2a/tos-useast2a-ve-0068c004/451b471137bb4682acc37b568ec00af6/?a=1988&br=726&bt=363&cd=0%7C0%7C1&cr=0&cs=0&cv=1&dr=0&ds=3&er=&expire=1609268171&l=20201229125527010115149228090ABC0E&lr=tiktok_m&mime_type=video_mp4&policy=2&qs=0&rc=M3dncmpoaHF0dDMzNjczM0ApOzk5OGQ0aWVkN2Q6NDo6ZGdmYGtnZzBtLXBfLS0yMTZzc19eNjZhXmJhMjNjMGExMl86Yw%3D%3D&signature=59d4e4165bf18eb2342b152447fe51e3&tk=tt_webid_v2&vl=&vr="
      />
      <PostFooter
        className="post__footer"
        description={description}
        get={777}
        recommend={555}
        collect={30}
      />
    </div>
  );
};

Post.propTypes = {
  username: PropTypes.string,
  photoURL: PropTypes.string,
  description: PropTypes.string,
  email: PropTypes.string,
  hashtag: PropTypes.array,
};

export default Post;
