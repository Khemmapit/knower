import {
  Box,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import Collection from "./Collection";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "../ProfileStyles";
import FormatListBulletedOutlinedIcon from "@material-ui/icons/FormatListBulletedOutlined";
import LibraryAddCheckOutlinedIcon from "@material-ui/icons/LibraryAddCheckOutlined";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../login/userSlice";
import { useHistory } from "react-router-dom";
import { userSearch } from "../../searchResult/searchSlice";

const ProfileBottom = ({ userData, setOfContent }) => {
  //other tools
  const dispatch = useDispatch();
  const history = useHistory();

  const styles = useStyles();
  const user = useSelector(selectUser);
  const [bottomBody, setBottomBody] = useState("content");
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isXSmall = useMediaQuery(theme.breakpoints.down("xs"));
  // This function handle search on user's collection
  const handleSearch = (event) => {
    event.preventDefault();
  };

  const goToSearch = (hashtag) => {
    dispatch(
      userSearch({
        hashtag: hashtag,
      })
    );
    history.replace(`/search:${hashtag}`);
  };

  return (
    <Grid container spacing={1} direction="column" alignItems="center">
      {/* Collection and/or Content button */}
      <Grid item className={styles.bottomHeadline}>
        <Box
          className={styles.bottomHeadlineBox}
          onClick={() => setBottomBody("content")}
        >
          <FormatListBulletedOutlinedIcon
            className={styles.bottomHeadlineBoxIcon}
          />
          <Typography
            variant={isXSmall ? "h6" : "h5"}
            color="initial"
            className={`${
              isSmall ? styles.headlineTextSM : styles.headlineText
            } ${bottomBody == "content" && styles.headlineTextSMOnClick}`}
          >
            Content
          </Typography>
        </Box>

        {user.email == userData.email && (
          <Box
            className={styles.bottomHeadlineBox}
            onClick={() => setBottomBody("collection")}
          >
            <LibraryAddCheckOutlinedIcon
              className={styles.bottomHeadlineBoxIcon}
            />
            <Typography
              variant={isXSmall ? "h6" : "h5"}
              color="initial"
              className={`${
                isSmall ? styles.headlineTextSM : styles.headlineText
              } ${bottomBody == "collection" && styles.headlineTextSMOnClick}`}
            >
              Collection
            </Typography>
          </Box>
        )}
      </Grid>

      {/* Content or Collection Body */}
      <Grid item direction="column" className={styles.bottomBody}>
        {bottomBody == "content" ? (
          <Grid container direction="column" spacing={3} alignItems="center">
            {setOfContent?.length > 0 ? (
              setOfContent.map((data, index) => (
                <Grid item>
                  <Collection
                    key={index}
                    name={data.name}
                    postID={data.postID}
                  />
                </Grid>
              ))
            ) : (
              <Typography variant="h4" color="initial">
                Create your own content
              </Typography>
            )}
          </Grid>
        ) : (
          <Grid container direction="column" alignItems="center" spacing={3}>
            {/* Search on your collection */}
            <Grid item>
              <Paper
                component="form"
                className={isXSmall ? styles.rootSearchXS : styles.rootSearch}
              >
                <InputBase
                  className={
                    isXSmall ? styles.inputSearchXS : styles.inputSearch
                  }
                  placeholder={
                    isSmall ? "Search collection" : "Search on your collection"
                  }
                  inputProps={{ "aria-label": "search google maps" }}
                />
                <IconButton
                  type="submit"
                  className={styles.iconButtonSeach}
                  aria-label="search"
                  onClick={handleSearch}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>

            {/* Set of Collection */}
            {setOfContent?.length > 0 ? (
              setOfContent.map((data, index) => (
                <Grid item>
                  <Collection
                    key={index}
                    name={data.name}
                    postID={data.postID}
                  />
                </Grid>
              ))
            ) : (
              <Grid item>
                <Typography variant="h4" color="initial">
                  Collect your own collection
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileBottom;
