import { Avatar, IconButton, useMediaQuery } from "@material-ui/core";
import React from "react";
//  import "./PostHeader.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";
import { choose_profile } from "../profile/profileSlice";
import { useHistory } from "react-router-dom";
import { user_search } from "../searchResult/searchSlice";
import PropTypes from "prop-types";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import indexStyles from "./indexStyles";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useTheme } from "@material-ui/styles";

const PostHeader = ({ username, photoURL, hashtag, email }) => {
  const styles = indexStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isSmall = useMediaQuery("(max-width:960px)");
  const isXSmall = useMediaQuery("(max-width:600px)");

  const handleSearch = (hash) => {
    // dispatch(
    //   userSearch({
    //     hashtag: hash,
    //   })
    // );
    history.replace(`/search:${hash}`);
  };

  const goToProfile = () => {
    // dispatch(
    //   chooseProfile({
    //     photoURL: photoURL,
    //     email: email,
    //     displayName: username,
    //   })
    // );
    history.replace(`/profile:${email}`);
    // email or displayName ???
  };

  return (
    <Grid container className={styles.headerContainer} alignItems="center">
      <Grid item xs={4} sm={3}>
        <Grid container spacing={1} alignItems="center" justify="center">
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
      <Grid item xs={7} sm={6}>
        <Grid container direction="column" alignItems="center">
          <Breadcrumbs
            className={styles.tags}
            separator={<NavigateNextIcon fontSize="small" />}
          >
            {hashtag.map((hash, index) => (
              <Link onClick={() => handleSearch(hash)} key={index}>
                {hash}
              </Link>
            ))}
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid item xs={1} sm={3}>
        <Grid container justify="flex-end">
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

PostHeader.propTypes = {
  username: PropTypes.string,
  photoURL: PropTypes.string,
  email: PropTypes.string,
  hashtag: PropTypes.array,
};
export default PostHeader;
