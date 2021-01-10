import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import useStyles from "./ProfileStyles";
import { useSelector } from "react-redux";
import { selectUser } from "../login/userSlice";
import { selectProfile } from "./profileSlice";
import EditUserData from "./EditUserData";
import db from "../../firebase";

const ProfileTop = ({ userData, contentNumber }) => {
  const styles = useStyles();
  const user = useSelector(selectUser);
  const profile = useSelector(selectProfile);

  // Internal State
  const [follow, setFollow] = useState(false);
  const [profileFollower, setProfileFollower] = useState([]);
  const [profileFollowing, setProfileFollowing] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [openFollowing, setOpenFollowing] = useState(false);
  const [openFollower, setOpenFollower] = useState(false);

  // This effect for fetch follow data ... may be change later ...
  useEffect(() => {
    if (profileFollower.includes(user.uid)) {
      setFollow(true);
      // console.log("run");
    }

    console.log("get into follow");
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
  }, [follow]);

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

  return (
    <>
      <Grid
        container
        color="default"
        spacing={5}
        className={styles.profileInfo}
        alignItems="center"
      >
        {/* profileInfo left */}
        <Grid item md={2}>
          <Avatar src={profile.photoURL} className={styles.profileInfoAvatar} />
        </Grid>

        {/* ProfileInfo Right */}
        <Grid
          md={6}
          item
          color="default"
          className={styles.profileDetails}
          direction="column"
        >
          <Grid container spacing={1}>
            <Grid item sm={12}>
              <Grid container spacing={1} alignItems="center">
                {/* Display name and button on right */}
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
                    <EditUserData userData={userData} />
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
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="initial">
                {userData.email}
              </Typography>
            </Grid>

            {/* user purpose */}
            <Grid item xs={12}>
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
              xs={12}
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
              {contentNumber > 1 ? (
                <Typography
                  variant="p"
                  color="initial"
                  className={styles.networkInfo}
                >
                  {contentNumber} Contents
                </Typography>
              ) : (
                <Typography
                  variant="p"
                  color="initial"
                  className={styles.networkInfo}
                >
                  {contentNumber} Content
                </Typography>
              )}
            </Grid>

            {/* description */}
            <Grid item xs={12}>
              <Typography variant="body1">{userData.description}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* !!! Dialog Zone !!! */}
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
          {/* This is for render profile's follower data */}
          {/* {setOfFollower?.map((followerData) => (
            <div className="followerDialog__userInfo">
              <Avatar src={followerData.photoURL} />
              <h3>{followerData.displayName}</h3>
            </div>
          ))} */}
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
          {/* This is for render profile's following data */}
          {/* {setOfFollowing?.map((followingData) => (
            <div className="followerDialog__userInfo">
              <Avatar src={followingData.photoURL} />
              <h3>{followingData.displayName}</h3>
            </div>
          ))} */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileTop;
