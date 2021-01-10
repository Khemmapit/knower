import {
  IconButton,
  Grid,
  Typography,
  Box,
  Divider,
  Paper,
  InputBase,
} from "@material-ui/core";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./ProfileStyles";
import db from "../../firebase";
import { selectProfile } from "./profileSlice";
import Collection from "./Collection";
import SearchIcon from "@material-ui/icons/Search";
import { selectUser } from "../login/userSlice";
import { useHistory } from "react-router-dom";
import { userSearch } from "../searchResult/searchSlice";
import ProfileTop from "./ProfileTop";

const Profile = () => {
  //other tools
  const dispatch = useDispatch();
  const history = useHistory();

  //Initialize data
  const user = useSelector(selectUser);
  const profile = useSelector(selectProfile);
  const styles = useStyles();
  const [userData, setUserData] = useState({});
  const [bottomBody, setBottomBody] = useState("content");
  const [setOfContent, setSetOfContent] = useState([]);

  useLayoutEffect(() => {
    db.collection("user")
      .doc(profile.uid)
      .get()
      .then((doc) => {
        setUserData(doc.data());
      });
    let setOfContentData = [];
    db.collection("user")
      .doc(user.uid)
      .collection("content")
      .get()
      .then((doc) => {
        let contentData = doc.docs;
        contentData.map((doc) => {
          setOfContentData.push(doc.data());
        });
        setSetOfContent(setOfContentData);
      });
  }, []);

  // function for count all user's content
  const countContent = (contentArray) => {
    let count = 0;
    contentArray.map((element) => {
      count += element.postID.length;
    });
    return count;
  };

  const goToSearch = (hashtag) => {
    dispatch(
      userSearch({
        hashtag: hashtag,
      })
    );
    history.replace(`/search:${hashtag}`);
  };

  // This function handle search on user's collection
  const handleSearch = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Box spacing={1} className={styles.profile}>
        {/*ProgileInfo (On top of the line) */}
        <ProfileTop
          userData={userData}
          contentNumber={countContent(setOfContent)}
        />

        <Divider />

        {/*Profile Bottom of the line => Profile Content and(or) Collection */}
        <Grid container spacing={1} direction="column">
          {/* Collection and/or Content button */}
          <Grid item direction="row" className={styles.bottomHeadline}>
            <Typography
              variant="h5"
              color="initial"
              className={`${styles.headlinetText} ${
                bottomBody == "content" && styles.headlinetTextOnClick
              }`}
              onClick={() => setBottomBody("content")}
            >
              Content
            </Typography>
            {user.email == userData.email && (
              <Typography
                variant="h5"
                color="initial"
                className={`${styles.headlinetText} ${
                  bottomBody == "collection" && styles.headlinetTextOnClick
                }`}
                onClick={() => setBottomBody("collection")}
              >
                Collection
              </Typography>
            )}
          </Grid>

          {/* Content or Collection Body */}
          <Grid item direction="column" className={styles.bottomBody}>
            {bottomBody == "content" ? (
              <Grid container direction="column" spacing={3}>
                {setOfContent?.length > 0 ? (
                  setOfContent.map((data, index) => (
                    <Collection
                      key={index}
                      name={data.name}
                      postID={data.postID}
                    />
                  ))
                ) : (
                  <Typography variant="h1" color="initial">
                    Create your own content
                  </Typography>
                )}
              </Grid>
            ) : (
              <Grid
                container
                direction="column"
                alignItems="center"
                spacing={3}
              >
                {/* Search on your collection */}
                <Grid item>
                  <Paper component="form" className={styles.rootSearch}>
                    <InputBase
                      className={styles.inputSearch}
                      placeholder="Search on your collection"
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
                <Grid item>
                  {setOfContent?.length > 0 ? (
                    setOfContent.map((data, index) => (
                      <Collection
                        key={index}
                        name={data.name}
                        postID={data.postID}
                      />
                    ))
                  ) : (
                    <Typography variant="h1" color="initial">
                      Collect your own collection
                    </Typography>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Profile;
