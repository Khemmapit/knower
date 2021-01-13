import { Box, Divider } from "@material-ui/core";
import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStyles from "./ProfileStyles";
import db from "../../firebase";
import { selectProfile } from "./profileSlice";
import { selectUser } from "../login/userSlice";
import ProfileTop from "./components/ProfileTop";
import ProfileBottom from "./components/ProfileBottom";

const Profile = () => {
  //Initialize data
  const user = useSelector(selectUser);
  const profile = useSelector(selectProfile);
  const styles = useStyles();
  const [userData, setUserData] = useState({});
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

  return (
    <Box spacing={1} className={styles.profile}>
      {/*ProgileInfo (On top of the line) */}
      <ProfileTop
        userData={userData}
        contentNumber={countContent(setOfContent)}
      />

      <Divider />

      {/*Profile Bottom of the line => Profile Content and(or) Collection */}
      <ProfileBottom userData={userData} setOfContent={setOfContent} />
    </Box>
  );
};

export default Profile;
