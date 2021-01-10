import React, { useEffect, useState } from "react";
import db from "../../firebase";
import useStyles from "./ProfileStyles";

const Follow = () => {
  const styles = useStyles();
  const [openFollwing, setopenFollowing] = useState(false);
  const [openFollwer, setopenFollower] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <>
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
        <Typography variant="p" color="initial" className={styles.networkInfo}>
          {countContent(setOfContent)} Contents
        </Typography>
      ) : (
        <Typography variant="p" color="initial" className={styles.networkInfo}>
          {countContent(setOfContent)} Content
        </Typography>
      )}

      {/* Diaolog  */}
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
              {/* onClick={() => {goToProfile(followerData)}} */}
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
              {/* onClick={() => {goToProfile(followingData)} */}
              <Avatar src={followingData.photoURL} />
              <h3>{followingData.displayName}</h3>
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Follow;
