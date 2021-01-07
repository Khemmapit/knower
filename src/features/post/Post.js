import React from "react";
import "./Post.css";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import PostBody from "./PostBody";
import { useDispatch } from "react-redux";
import { user_search } from "../searchResult/searchSlice";

const Post = ({ username, photoURL, description, email, hashtag, uid }) => {
  return (
    <div className="post">
      <PostHeader
        className="post__header"
        username={username}
        photoURL={photoURL}
        email={email}
        hashtag={hashtag}
        uid={uid}
      />
      <PostBody
        className="post__body"
        videoURL="gs://knower-test.appspot.com/math/calculus/limit/Introduction to limits Limits Differential Calculus Khan Academy.mp4"
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

export default Post;
