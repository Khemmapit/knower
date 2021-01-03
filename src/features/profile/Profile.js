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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import db from "../../firebase";
import { selectProfile } from "./profileSlice";
import EditIcon from "@material-ui/icons/Edit";
import Content from "./Content";
import Collection from "./Collection";
import SearchIcon from "@material-ui/icons/Search";
import { selectUser } from "../login/userSlice";
import { useHistory } from "react-router-dom";
import { user_search } from "../searchResult/searchSlice";
const Profile = () => {
  // other tools
  const dispatch = useDispatch();
  const history = useHistory();

  // Initialize data
  const user = useSelector(selectUser);
  const profile = useSelector(selectProfile);
  const [userData, setUserData] = useState({});
  const [bottomBody, setBottomBody] = useState("content");
  const [setOfContent, setSetOfContent] = useState([
    "climatechange",
    "startup",
    "technology",
  ]);
  // state to dynamic data
  const [editData, setEditData] = useState({});
  const [openEdit, setOpenEdit] = useState(false); // this state for control edit user data
  const [description, setDescription] = useState("");
  const [change, setChange] = useState(true);

  useEffect(() => {
    db.collection("user")
      .doc(profile.email)
      .get()
      .then((doc) => {
        setUserData(doc.data());
      });
    db.collection("user")
      .get()
      .then((doc) => console.log(doc.docs));
    setChange(true);
  }, [change]);

  const handleOpenEdit = () => {
    if (openEdit) {
      setOpenEdit(false);
    } else {
      setOpenEdit(true);
    }
  };

  const handleSubmitEdit = (event) => {
    console.log(description);
    setOpenEdit(false);
    db.collection("user").doc(user.email).update({
      description: description,
    });
    setDescription("");
    setChange(false);
  };

  const goToSearch = (hashtag) => {
    dispatch(
      user_search({
        hashtag: hashtag,
      })
    );
    history.replace(`/search:${hashtag}`);
  };

  return (
    <div className="profile">
      <div className="profile__top">
        <div className="profile__topLeft">
          <Avatar src={userData.photoURL} />
        </div>
        <div className="profile__topRight">
          <h1>
            {userData.displayName}
            {userData.email === user.email && (
              <>
                <IconButton onClick={handleOpenEdit}>
                  <EditIcon />
                </IconButton>
                <Dialog
                  open={openEdit}
                  onClose={handleOpenEdit}
                  aria-labelledby="edit-form"
                >
                  <DialogTitle id="edit-form">Edit</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Description"
                      type="text"
                      fullWidth
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
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
              </>
            )}
          </h1>
          <p>{userData.email}</p>
          <div className="user__network">
            <p>{userData.follower} Follower</p>
            <p>{userData.following} Following</p>
            <p>{userData.content} Contents</p>
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
    </div>
  );
};

export default Profile;

{
  /* <div className="content">
                                <div className="content__topic">
                                    <h3>#climatechange</h3>
                                    <div className="video__contentList">
                                        <Content url=""
                                            description="the world nedd us for help !"
                                            hashtag={["environment","climatechange","greenhousegases"]}
                                        />
                                        <Content url=""
                                            description="the world nedd us for help !"
                                            hashtag={["environment","climatechange","greenhousegases"]}
                                        />
                                        <Content url=""
                                            description="the world nedd us for help !"
                                            hashtag={["environment","climatechange","greenhousegases"]}
                                        />
                                        <Content url=""
                                            description="the world nedd us for help !"
                                            hashtag={["environment","climatechange","greenhousegases"]}
                                        />
                                        <Content url=""
                                            description="the world nedd us for help !"
                                            hashtag={["environment","climatechange","greenhousegases"]}
                                        />
                                    </div>
                                </div>
                                <div className="content__topic">
                                    <h3>#startup</h3>
                                    <div className="video__contentList">
                                        <Content url=""
                                            description="the world need startup for help other people's life better !"
                                            hashtag={["business","startup","technology"]}
                                        />
                                        <Content url=""
                                            description="the world need startup for help other people's life better !"
                                            hashtag={["business","startup","technology"]}
                                        />
                                        <Content url=""
                                            description="the world need startup for help other people's life better !"
                                            hashtag={["business","startup","technology"]}
                                        />
                                        <Content url=""
                                            description="the world need startup for help other people's life better !"
                                            hashtag={["business","startup","technology"]}
                                        />
                                        <Content url=""
                                            description="the world need startup for help other people's life better !"
                                            hashtag={["business","startup","technology"]}
                                        />
                                        <Content url=""
                                            description="the world need startup for help other people's life better !"
                                            hashtag={["business","startup","technology"]}
                                        />
                                    </div>
                                </div>
                            </div> */
}
