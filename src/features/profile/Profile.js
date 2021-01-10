import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Grid,
  Typography,
  Box,
  Divider,
  Paper,
  InputBase,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import useStyles from "./ProfileStyles";
import db from "../../firebase";
import firebase from "firebase";
import { selectProfile, chooseProfile } from "./profileSlice";
import EditIcon from "@material-ui/icons/Edit";
import Collection from "./Collection";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { login, selectUser } from "../login/userSlice";
import { useHistory } from "react-router-dom";
import { userSearch } from "../searchResult/searchSlice";
import VideoSet from "../video/VideoSet";
import Follow from "./Follow";

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
  //state of dynamic data
  const [openEdit, setOpenEdit] = useState(false); //this state for control edit user data
  const [description, setDescription] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [follow, setFollow] = useState(false);
  const [profileFollower, setProfileFollower] = useState([]);
  const [profileFollowing, setProfileFollowing] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [openFollower, setOpenFollower] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);
  const [setOfFollower, setSetOfFollower] = useState([]);
  const [setOfFollowing, setSetOfFollowing] = useState([]);

  useEffect(() => {
    if (profileFollower.includes(user.uid)) {
      setFollow(true);
      // console.log("run");
    }
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    console.log("get into follow");
    db.collection("user")
      .doc(profile.uid)
      .get()
      .then((doc) => {
        setUserData(doc.data());
      });

    // This is condition to set profile follow data
    db.collection("follow")
      .doc(profile.uid)
      .get()
      .then((doc) => {
        let profileFollowData = doc.data();
        setProfileFollower(profileFollowData?.follower);
        setProfileFollowing(profileFollowData?.following);
        // console.log("setProfileFollow");
      });

    //This is condition to ser user follow data
    db.collection("follow")
      .doc(user.uid)
      .get()
      .then((doc) => {
        let userFollowData = doc.data();
        setUserFollowing(userFollowData?.following);
      });

    const arr = [];
    profileFollowing.map((followingUid) => {
      db.collection("user")
        .doc(followingUid)
        .get()
        .then((doc) => {
          arr.push(doc.data());
          // console.log("set profile following");
        });
    });
    setSetOfFollowing(arr);

    // This is the condition of set the set of profile's follower !
    const arr2 = [];
    profileFollower.map((followerUid) => {
      db.collection("user")
        .doc(followerUid)
        .get()
        .then((doc) => {
          arr2.push(doc.data());
          // console.log("set profile follower");
        });
    });
    setSetOfFollower(arr2);
  }, [follow]);

  const handleSubmitEdit = () => {
    setOpenEdit(false);
    if (description != "") {
      db.collection("user").doc(user.uid).update({
        description: description,
      });
    }
    if (displayName != "") {
      db.collection("user").doc(user.uid).update({
        displayName: displayName,
      });
    }
    if (photoURL != "") {
      db.collection("user").doc(user.uid).update({
        photoURL: photoURL,
      });
    }
    if (purpose != "") {
      db.collection("user").doc(user.uid).update({
        purpose: purpose,
      });
    }
    db.collection("user")
      .doc(user.uid)
      .get()
      .then((doc) => {
        setUserData(doc.data());
        console.log("set data success");
      });
    // update global state of userSlice
    firebase
      .auth()
      .currentUser.updateProfile({
        uid: userData.uid,
        photoURL: userData.photoURL,
        email: userData.email,
        displayName: userData.displayName,
      })
      .then((result) =>
        console.log("update profile success", firebase.auth().currentUser)
      );
    dispatch(
      login({
        uid: userData.uid,
        photoURL: userData.photoURL,
        email: userData.email,
        displayName: userData.displayName,
      })
    );
    setPhotoURL("");
    setDisplayName("");
    setDescription("");
    setPurpose("");
  };

  const goToSearch = (hashtag) => {
    dispatch(
      userSearch({
        hashtag: hashtag,
      })
    );
    history.replace(`/search:${hashtag}`);
  };

  const handleFollow = () => {
    if (follow) {
      //user want to Unfollow this profile
      profileFollower.splice(profileFollower.indexOf(user.uid), 1);
      db.collection("follow").doc(profile.uid).update({
        follower: profileFollower,
      });

      // eliminate uid of profile out of user following doc
      userFollowing.splice(userFollowing.indexOf(profile.uid), 1);
      db.collection("follow").doc(user.uid).update({
        following: userFollowing,
      });
      setFollow(false);
    } else {
      //user want to follow this profile
      if (!userFollowing.includes(profile.uid)) {
        // add uid of user doc to profile follower doc
        profileFollower.push(user.uid);
        db.collection("follow").doc(profile.uid).update({
          follower: profileFollower,
        });

        // add uid of profile doc to user following doc
        userFollowing.push(profile.uid);
        db.collection("follow").doc(user.uid).update({
          following: userFollowing,
        });
      }
      setFollow(true);
    }
  };

  // This function handle search on user's collection
  const handleSearch = (event) => {
    event.preventDefault();
  };

  // const goToProfile = (userInfo) => {
  //     dispatch(
  //       choose_profile({
  //         photoURL: userInfo.photoURL,
  //         email: userInfo.email,
  //         displayName: userInfo.displayName,
  //         uid:userInfo.uid,
  //       })
  //     );

  // };

  // console.log("render !");
  // console.log(setOfFollower);
  // console.log(setOfFollowing);
  // console.log(setOfContent);

  return (
    <>
      <Box spacing={1} className={styles.profile}>
        {/*ProgileInfo (On top of the line) */}
        <Grid
          container
          color="default"
          spacing={5}
          className={styles.profileInfo}
          alignItems="center"
        >
          {/* profileInfo left */}
          <Grid item>
            <Avatar
              item
              src={profile.photoURL}
              className={styles.profileInfoAvatar}
            />
          </Grid>

          {/* ProfileInfo Right */}
          <Grid
            item
            color="default"
            className={styles.profileDetails}
            direction="column"
          >
            <Grid container spacing={1}>
              {/* Display name and button on right */}
              <Grid item sm={12}>
                <Grid container spacing={1} alignItems="center">
                  <Typography
                    variant="h5"
                    color="initial"
                    gutterBottom
                    className={styles.profileDetailsName}
                  >
                    {userData.displayName}
                  </Typography>
                  {/* FollowButton of EditIcon */}
                  <Grid item>
                    {userData.email === user.email ? (
                      <IconButton
                        onClick={() => setOpenEdit(!openEdit)}
                        className={styles.editIcon}
                      >
                        <EditIcon />
                      </IconButton>
                    ) : (
                      <Button
                        className={`${
                          follow ? "followingButton" : "followButton"
                        }`}
                        onClick={handleFollow}
                      >
                        {follow ? "Following" : "Follow"}
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              {/* user email */}
              <Grid item>
                <Typography variant="subtitle1" color="initial">
                  {userData.email}
                </Typography>
              </Grid>

              {/* user purpose */}
              <Grid item>
                <Typography
                  variant="subtitle2"
                  color="initial"
                  className={styles.profileDetailsPurpose}
                >
                  {userData.purpose}
                </Typography>
              </Grid>

              {/* user network */}
              <Grid
                item
                alignContent="space-between"
                className={styles.networkContainer}
              >
                <Typography
                  variant="p"
                  color="initial"
                  className={styles.networkInfo}
                  onClick={() => setOpenFollower(true)}
                >
                  {profileFollower.length} Follower
                </Typography>
                <Typography
                  variant="p"
                  color="initial"
                  className={styles.networkInfo}
                  onClick={() => setOpenFollowing(true)}
                >
                  {profileFollowing.length} Following
                </Typography>
                {countContent(setOfContent) > 1 ? (
                  <Typography
                    variant="p"
                    color="initial"
                    className={styles.networkInfo}
                  >
                    {countContent(setOfContent)} Contents
                  </Typography>
                ) : (
                  <Typography
                    variant="p"
                    color="initial"
                    className={styles.networkInfo}
                  >
                    {countContent(setOfContent)} Content
                  </Typography>
                )}
              </Grid>

              {/* description */}
              <Grid item>
                <Typography variant="body1">{userData.description}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

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
                {setOfContent?.map((data, index) => (
                  <Grid item>
                    <Collection
                      key={index}
                      name={data.name}
                      postID={data.postID}
                    />
                  </Grid>
                ))}
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
                  {setOfContent?.map((data, index) => (
                    <Collection
                      key={index}
                      name={data.name}
                      postID={data.postID}
                    />
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>

      {/* !!! Dialog Zone !!! */}
      {/* Edit user data Dialog */}
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(!openEdit)}
        aria-labelledby="edit-form"
      >
        <DialogTitle id="edit-form">Edit</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Purpose"
            type="text"
            fullWidth
            value={purpose}
            onChange={(event) => setPurpose(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <TextField
            margin="dense"
            label="Display Name"
            type="text"
            fullWidth
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
          />
          <TextField
            margin="dense"
            label="PhotoURL"
            type="text"
            fullWidth
            value={photoURL}
            onChange={(event) => setPhotoURL(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(!openEdit)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitEdit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Follower Dialog */}
      <Dialog
        open={openFollower}
        onClose={() => setOpenFollower(false)}
        aria-labelledby="follower-dialog"
      >
        <DialogTitle id="follower-dialog">
          <span>Follower</span>
          <IconButton onClick={() => setOpenFollower(false)}>
            <HighlightOffIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {setOfFollower?.map((followerData) => (
            <div className="followerDialog__userInfo">
              <Avatar src={followerData.photoURL} />
              <h3>{followerData.displayName}</h3>
            </div>
          ))}
        </DialogContent>
      </Dialog>

      {/* Following Dialog */}
      <Dialog
        open={openFollowing}
        onClose={() => setOpenFollowing(false)}
        aria-labelledby="following-dialog"
      >
        <DialogTitle id="following-dialog">
          <span>Following</span>
          <IconButton onClick={() => setOpenFollowing(false)}>
            <HighlightOffIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {setOfFollowing?.map((followingData) => (
            <div className="followerDialog__userInfo">
              <Avatar src={followingData.photoURL} />
              <h3>{followingData.displayName}</h3>
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile;
