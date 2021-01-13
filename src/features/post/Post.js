import React from "react";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import indexStyles from "./indexStyles";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import { useMediaQuery, useTheme } from "@material-ui/core";

const Post = ({ data }) => {
  const styles = indexStyles();
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Card
      className={
        isXSmall ? styles.videoSetContainerXS : styles.videoSetContainer
      }
    >
      <PostHeader
        username={data.username}
        photoURL={data.profilePhoto}
        email={data.email}
        hashtag={data.hashtag}
      />
      {data.type === "video" ? (
        <video className={styles.content} src={data.mediaURL} controls />
      ) : (
        <img
          className={styles.content}
          src={data.mediaURL}
          alt={data.description}
        />
      )}
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
