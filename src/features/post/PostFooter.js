import React, { useState } from "react";
//  import "./PostFooter.css";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import LibraryAddOutlinedIcon from "@material-ui/icons/LibraryAddOutlined";
import { Avatar } from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useSelector } from "react-redux";
import { selectUser } from "../login/userSlice";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import indexStyle from "./indexStyle";

const PostFooter = ({ description, get, recommend, collect }) => {
  const styles = indexStyle();
  const [input, setInput] = useState("");
  const [getIt, setGetIt] = useState(false);
  const user = useSelector(selectUser);
  const [comments, setComments] = useState([
    {
      username: "Gognumb",
      comment: "Congratulation guys !",
      photoURL:
        "https://scontent.futh1-1.fna.fbcdn.net/v/t1.0-9/61539283_1262413647250320_6631888671387680768_n.jpg?_nc_cat=102&ccb=2&_nc_sid=174925&_nc_eui2=AeHlVYTJVb9nYsoSsU2eMutf5Ybe3CgDYbPlht7cKANhswvS4rNbFUmnW6pVECXtApesAAqvh91chQZYtCmqu9aJ&_nc_ohc=bRxP618AhYQAX-K_Itt&_nc_ht=scontent.futh1-1.fna&oh=a29db2461e837a0db4f6ae93c2d737c5&oe=600F46B9",
    },
  ]);

  const sendComment = (event) => {
    event.preventDefault();
    setComments([
      ...comments,
      {
        username: user.displayName.split(" ")[0],
        comment: input,
        photoURL: user.photoURL,
      },
    ]);
    // send user's input to our databases in collection of that post
    setInput("");
  };

  const handelGetIt = () => {
    setGetIt(!getIt);
  };
  return (
    <Box>
      <Grid container className="postFooter">
        <Grid item xs="auto" className={styles.actionContainer}>
          <Button
            onClick={handelGetIt}
            startIcon={<CheckCircleOutlineIcon />}
            className={getIt ? styles.gotIt : null}
          >
            get it !
          </Button>
          <Button startIcon={<CommentOutlinedIcon />}>recommend</Button>
          <Button startIcon={<LibraryAddOutlinedIcon />}>collect</Button>
        </Grid>
        <Grid item xs="auto" className="description">
          <BookmarkBorderIcon />
          <p>{description}</p>
        </Grid>
      </Grid>
    </Box>
  );
};

PostFooter.propTypes = {
  description: PropTypes.number,
  get: PropTypes.number,
  recommend: PropTypes.number,
  collect: PropTypes.number,
};

export default PostFooter;
