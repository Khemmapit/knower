import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
//  import "./PostHeader.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";
import { chooseProfile } from "../profile/profileSlice";
import { useHistory } from "react-router-dom";
import { userSearch } from "../searchResult/searchSlice";
import PropTypes from "prop-types";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import indexStyle from "./indexStyle";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Box from "@material-ui/core/Box";

const PostHeader = ({ username, photoURL, hashtag, email }) => {
  const styles = indexStyle();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSearch = (hash) => {
    dispatch(
      userSearch({
        hashtag: hash,
      })
    );
    history.replace(`/search:${hash}`);
  };

  const goToProfile = () => {
    dispatch(
      chooseProfile({
        photoURL: photoURL,
        email: email,
        displayName: username,
      })
    );
    history.replace(`/profile:${email}`);
    // email or displayName ???
  };

  return (
    <Box className={styles.headerContainer}>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={6}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Avatar src={photoURL} onClick={goToProfile} alt={username} />
            </Grid>
            <Grid item>
              <Link className={styles.usernameLink} onClick={goToProfile}>
                {username.split(" ")[0]}
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container justify="flex-end">
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>

      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Breadcrumbs separator={<NavigateNextIcon />}>
            {hashtag.map((tag, index) => (
              <Link onClick={(e) => handleSearch(tag)} key={index}>
                {tag}
              </Link>
            ))}
          </Breadcrumbs>
        </Grid>
      </Grid>
    </Box>
  );
};

PostHeader.propTypes = {
  username: PropTypes.string,
  photoURL: PropTypes.string,
  email: PropTypes.string,
  hashtag: PropTypes.array,
};
export default PostHeader;
