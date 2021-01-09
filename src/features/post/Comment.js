import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

const Comment = ({ username, userImage, text }) => {
  return (
    <Card>
      <Grid container spacing={1}>
        <Grid item>
          <Avatar src={userImage} alt={username} />
        </Grid>
        <Grid item>
          <Typography>{username}</Typography>
        </Grid>
      </Grid>
      <Avatar></Avatar>
      <Typography>{text}</Typography>
    </Card>
  );
};

Comment.propTypes = {
  username: PropTypes.string,
  userImage: PropTypes.string,
  text: PropTypes.string,
};

export default Comment;
