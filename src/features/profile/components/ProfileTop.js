import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import useStyles from "../ProfileStyles";
import { useSelector } from "react-redux";
import { selectUser } from "../../login/userSlice";
import { selectProfile } from "../profileSlice";
import EditUserData from "./EditUserData";
import db from "../../../firebase";
import FollowUser from "./FollowUser";

const ProfileTop = ({ userData, contentNumber }) => {
  const styles = useStyles();
  const user = useSelector(selectUser);
  const profile = useSelector(selectProfile);
  const isSmall = useMediaQuery("(max-width:960px)");
  const isXSmall = useMediaQuery("(max-width:600px)");

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
    }

    console.log("get into follow");
    // This is condition to set profile follow data
    // profileFollower contain uid of profile's follower
    // profileFollowing contain uid of profile's following
    db.collection("follow")
      .doc(profile.uid)
      .get()
      .then((doc) => {
        let profileFollowData = doc.data();
        setProfileFollower(profileFollowData?.follower);
        setProfileFollowing(profileFollowData?.following);
      });

    //This is condition to set user follow data
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

  console.log(profileFollower);
  console.log(profileFollowing);
  console.log(userFollowing);

  return (
    <>
      <Grid
        container
        color="default"
        spacing={5}
        className={styles.profileInfo}
        alignItems="center"
        direction={isSmall ? "column" : "row"}
      >
        {isXSmall ? (
          <>
            {/* This is for extra small (XS) */}
            {/* profileInfo TOP */}
            <Grid
              container
              spacing={3}
              justify="center"
              alignItems="center"
              clssName={styles.profileInfoXS}
            >
              <Grid item>
                <Avatar
                  src={userData.photoURL}
                  className={styles.profileInfoAvatarXS}
                />
              </Grid>

              <Grid item>
                <Grid container spacing={1} direction="column">
                  {/* DisplayName and afterNameButton */}
                  <Grid item>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Typography variant="h6" color="initial">
                          {userData.displayName}
                        </Typography>
                      </Grid>
                      <Grid item>
                        {userData.email == user.email ? (
                          <EditUserData
                            userData={userData}
                            size="small"
                            screen="xs"
                          />
                        ) : (
                          <Button
                            className={`${
                              follow
                                ? styles.followingButton
                                : styles.followButton
                            }`}
                            onClick={handleFollow}
                          >
                            {follow ? "Following" : "Follow"}
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* User's Network */}
                  <Grid item>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Typography
                          variant="p"
                          color="initial"
                          className={styles.networkInfoXS}
                          onClick={() => setOpenFollower(true)}
                        >
                          {profileFollower.length} Follower
                        </Typography>
                      </Grid>

                      <Grid item>
                        <Typography
                          variant="p"
                          color="initial"
                          className={styles.networkInfoXS}
                          onClick={() => setOpenFollowing(true)}
                        >
                          {profileFollowing.length} Following
                        </Typography>
                      </Grid>

                      <Grid item>
                        {contentNumber > 1 ? (
                          <Typography
                            variant="p"
                            color="initial"
                            className={styles.networkInfoXS}
                          >
                            {contentNumber} Contents
                          </Typography>
                        ) : (
                          <Typography
                            variant="p"
                            color="initial"
                            className={styles.networkInfoXS}
                          >
                            {contentNumber} Content
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* profileInfo Bottom */}
            <Grid container spacing={1} direction="column" alignItems="center">
              <Grid item>
                <Typography
                  variant="body2"
                  color="initial"
                  className={styles.profileDetailsPurposeXS}
                >
                  {userData.purpose}
                </Typography>
              </Grid>

              <Grid item>
                <Typography
                  variant="body2"
                  color="initial"
                  className={styles.profileDescriptionXS}
                >
                  {userData.description}
                </Typography>
              </Grid>
            </Grid>
          </>
        ) : isSmall ? (
          <>
            {/* This is for small (SM) */}
            {/* ProfileInfo TOP */}
            <Grid
              container
              spacing={5}
              className={styles.profileInfoTop}
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item sm={2} md={2}>
                <Avatar
                  src={profile.photoURL}
                  className={styles.profileInfoAvatarSM}
                />
              </Grid>

              <Grid item sm={8} className={styles.profileInfoTopDetails}>
                <Grid container direction="column">
                  {/* details top */}
                  <Grid item>
                    <Grid container spacing={1} alignItems="center">
                      {/* Display name and button on right */}
                      <Grid item>
                        <Typography
                          variant="h5"
                          color="initial"
                          gutterBottom
                          className={styles.profileDetailsNameSM}
                        >
                          {userData.displayName}
                        </Typography>
                      </Grid>
                      {/* FollowButton of EditIcon */}
                      <Grid item>
                        {userData.email === user.email ? (
                          <EditUserData userData={userData} size="small" />
                        ) : (
                          <Button
                            className={`${
                              follow
                                ? styles.followingButton
                                : styles.followButton
                            }`}
                            onClick={handleFollow}
                          >
                            {follow ? "Following" : "Follow"}
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* details bottom */}
                  <Grid item>
                    <Grid container spacing={1}>
                      {/* user purpose */}
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle2"
                          color="initial"
                          className={styles.profileDetailsPurposeSM}
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
                          className={styles.networkInfoSM}
                          onClick={() => setOpenFollower(true)}
                        >
                          {profileFollower.length} Follower
                        </Typography>
                        <Typography
                          variant="p"
                          color="initial"
                          className={styles.networkInfoSM}
                          onClick={() => setOpenFollowing(true)}
                        >
                          {profileFollowing.length} Following
                        </Typography>
                        {contentNumber > 1 ? (
                          <Typography
                            variant="p"
                            color="initial"
                            className={styles.networkInfoSM}
                          >
                            {contentNumber} Contents
                          </Typography>
                        ) : (
                          <Typography
                            variant="p"
                            color="initial"
                            className={styles.networkInfoSM}
                          >
                            {contentNumber} Content
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* ProfileInfo Bottom */}
            {/* description */}
            <Grid
              md={6}
              item
              color="default"
              className={styles.profileInfoDescription}
            >
              <Typography variant="body2">{userData.description}</Typography>
            </Grid>
          </>
        ) : (
          <>
            {/* This for medium,large and extra large */}
            {/* profileInfo left */}
            <Grid item md={2}>
              <Avatar
                src={profile.photoURL}
                className={styles.profileInfoAvatar}
              />
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
                            follow
                              ? styles.followingButton
                              : styles.followButton
                          }`}
                          onClick={handleFollow}
                        >
                          {follow ? "Following" : "Follow"}
                        </Button>
                      )}
                    </Grid>
                  </Grid>
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
                  <Typography variant="body1">
                    {userData.description}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>

      {/* !!! Dialog Zone !!! */}
      {/* Follower Dialog */}
      <Dialog
        open={openFollower}
        onClose={() => setOpenFollower(false)}
        aria-labelledby="follower-dialog"
      >
        <DialogTitle id="follower-dialog">
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Typography variant="h6" color="initial">
                Follower
              </Typography>
            </Grid>
            <Grid>
              <IconButton onClick={() => setOpenFollower(false)}>
                <HighlightOffIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          {/* This is for render profile's follower data */}
          {profileFollower.map((uid) => (
            <FollowUser uid={uid} size="small" />
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
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Typography variant="h6" color="initial">
                Following
              </Typography>
            </Grid>
            <Grid>
              <IconButton onClick={() => setOpenFollowing(false)}>
                <HighlightOffIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          {/* This is for render profile's following data */}
          {profileFollowing.map((uid) => (
            <FollowUser uid={uid} size="small" />
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileTop;
