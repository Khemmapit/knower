import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import db from "../../firebase";
import firebase from "firebase";
import { selectProfile, choose_profile } from "./profileSlice";
import EditIcon from "@material-ui/icons/Edit";
import Content from "./Content";
import Collection from "./Collection";
import SearchIcon from "@material-ui/icons/Search";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { login, selectUser } from "../login/userSlice";
import { Link, useHistory } from "react-router-dom";
import { user_search } from "../searchResult/searchSlice";

const Profile = () => {
  //other tools
  const dispatch = useDispatch();
  const history = useHistory();

  //Initialize data
  const user = useSelector(selectUser);
  const profile = useSelector(selectProfile);
  const [userData, setUserData] = useState({});
  const [bottomBody, setBottomBody] = useState("content");
  const [setOfContent, setSetOfContent] = useState([
    "climatechange",
    "startup",
    "technology",
  ]);
  //state of dynamic data
  const [forRender, setForRender] = useState(true);
  const [openEdit, setOpenEdit] = useState(false); //this state for control edit user data
  const [description, setDescription] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [follow, setFollow] = useState(false);
  const [profileFollower, setProfileFollower] = useState([]);
  const [profileFollowing, setProfileFollowing] = useState([]);
  const [userFollower, setUserFollower] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [openFollower, setOpenFollower] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);
  const [setOfFollower, setSetOfFollower] = useState([]);
  const [setOfFollowing, setSetOfFollowing] = useState([]);

  useLayoutEffect(() => {
    if (userFollowing.includes(profile.uid)) {
      setFollow(true);
    }
  });

  useLayoutEffect(() => {
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
      });

    //This is condition to ser user follow data
    db.collection("follow")
      .doc(user.uid)
      .get()
      .then((doc) => {
        let userFollowData = doc.data();
        // console.log(userFollowData)
        setUserFollower(userFollowData?.follower);
        setUserFollowing(userFollowData?.following);
      });

    // This is the condition of set the set of profile's following !
    const arr = [];
    profileFollowing.map((followingUid) => {
      db.collection("user")
        .doc(followingUid)
        .get()
        .then((doc) => {
          arr.push(doc.data());
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
        });
    });
    setSetOfFollower(arr2);
  }, [follow]);

  const handleOpenEdit = () => {
    if (openEdit) {
      setOpenEdit(false);
    } else {
      setOpenEdit(true);
    }
  };

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
      user_search({
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

  console.log("render !");
  return (
    <div className="profile">
      <div className="profile__top">
        <div className="profile__topLeft">
          <Avatar src={userData.photoURL === null ? "" : userData.photoURL} />
        </div>
        <div className="profile__topRight">
          <h1>
            {userData.displayName}
            {/* Edit user data */}
            {userData.email === user.email ? (
              <IconButton onClick={handleOpenEdit}>
                <EditIcon />
              </IconButton>
            ) : (
              <Button
                className={`${follow ? "followingButton" : "followButton"}`}
                onClick={handleFollow}
              >
                {follow ? "Following" : "Follow"}
              </Button>
            )}
          </h1>
          {userData.uid == user.uid && (
            <h3 className="user__purpose">{userData.purpose}</h3>
          )}
          <p>{userData.email}</p>
          <div className="user__network">
            <p onClick={() => setOpenFollower(true)}>
              {profileFollower.length} <span>Follower</span>
            </p>
            <p onClick={() => setOpenFollowing(true)}>
              {profileFollowing.length} <span>Following</span>
            </p>
            <p>
              {setOfContent.length > 1
                ? `${setOfContent.length} Contents`
                : `${setOfContent.length} Content`}{" "}
            </p>
          </div>
          <p className="description">{userData.description}</p>
        </div>
      </div>
      <div className="profile__bottom">
        <div className="bottom__header">
          <h2
            className={`header__content`}
            onClick={() => setBottomBody("content")}
          >
            Content
            {bottomBody === "content" && <hr />}
          </h2>
          {userData.email === user.email && (
            <h2
              className={`header__collection`}
              onClick={() => setBottomBody("collection")}
            >
              Collection
              {bottomBody === "collection" && <hr />}
            </h2>
          )}
        </div>
        <div className="bottom__body">
          {userData.email === user.email ? (
            bottomBody === "content" ? (
              <div className="content">
                {setOfContent.map((hashtag) => (
                  <div className="content__topic">
                    <h3 onClick={() => goToSearch(hashtag)}>#{hashtag}</h3>
                    <div className="video__contentList">
                      <Content
                        url=""
                        description="the world nedd us for help !"
                        hashtag={[
                          "environment",
                          "climatechange",
                          "greenhousegases",
                        ]}
                      />
                      <Content
                        url=""
                        description="the world nedd us for help !"
                        hashtag={[
                          "environment",
                          "climatechange",
                          "greenhousegases",
                        ]}
                      />
                      <Content
                        url=""
                        description="the world nedd us for help !"
                        hashtag={[
                          "environment",
                          "climatechange",
                          "greenhousegases",
                        ]}
                      />
                      <Content
                        url=""
                        description="the world nedd us for help !"
                        hashtag={[
                          "environment",
                          "climatechange",
                          "greenhousegases",
                        ]}
                      />
                      <Content
                        url=""
                        description="the world nedd us for help !"
                        hashtag={[
                          "environment",
                          "climatechange",
                          "greenhousegases",
                        ]}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="collection">
                <center>
                  <div className="collection__search">
                    <SearchIcon />
                    <input
                      type="text"
                      placeholder="search on your collection"
                    />
                    <button type="submit">search !</button>
                  </div>
                </center>
                <Collection name="fighting for unicorn" />
                <Collection name="road to billionaire" />
                <Collection name="react developer" />
                <Collection name="javascript developer" />
              </div>
            )
          ) : (
            <div className="content">
              {setOfContent.map((hashtag) => (
                <div className="content__topic">
                  <h3 onClick={() => goToSearch(hashtag)}>#{hashtag}</h3>
                  <div className="video__contentList">
                    <Content
                      url=""
                      description="the world nedd us for help !"
                      hashtag={[
                        "environment",
                        "climatechange",
                        "greenhousegases",
                      ]}
                    />
                    <Content
                      url=""
                      description="the world nedd us for help !"
                      hashtag={[
                        "environment",
                        "climatechange",
                        "greenhousegases",
                      ]}
                    />
                    <Content
                      url=""
                      description="the world nedd us for help !"
                      hashtag={[
                        "environment",
                        "climatechange",
                        "greenhousegases",
                      ]}
                    />
                    <Content
                      url=""
                      description="the world nedd us for help !"
                      hashtag={[
                        "environment",
                        "climatechange",
                        "greenhousegases",
                      ]}
                    />
                    <Content
                      url=""
                      description="the world nedd us for help !"
                      hashtag={[
                        "environment",
                        "climatechange",
                        "greenhousegases",
                      ]}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* !!! Dialog Zone !!! */}
      {/* Edit user data Dialog */}
      <Dialog
        open={openEdit}
        onClose={handleOpenEdit}
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
          <Button onClick={handleOpenEdit} color="primary">
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
    </div>
  );
};

export default Profile;
