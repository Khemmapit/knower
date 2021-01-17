import React from "react";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import indexStyles from "./indexStyle";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

const Post = ({ data }) => {
  const styles = indexStyles();

  return (
    <Card className={styles.videoSetContainer}>
      <PostHeader
        username={data.username}
        photoURL={data.profilePhoto}
        email={data.email}
        hashtag={data.hashtag}
      />
      <video className={styles.content} src={data.mediaURL} controls />
      <PostFooter data={data.description} get={0} recommend={0} collect={0} />
    </Card>
  );
};

Post.propTypes = {
  data: {
    username: PropTypes.string,
    profilePhoto: PropTypes.string,
    mediaURL: PropTypes.string,
    description: PropTypes.string,
    email: PropTypes.string,
    type: PropTypes.string,
    hashtag: PropTypes.array,
  },
};

export default Post;
