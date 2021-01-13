import db from "../firebase";

const fetcher = async (key) => {
  const collections = [];
  await db
    .collection(key)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        collections.push(doc.data());
      });
    });
  return collections;
};

// this function fetch each one of post data form collection "post" and doc "id" (variable) }
const fetchPostData = async (id) => {
  let postData;
  console.log(id);
  await db
    .collection("post")
    .doc(id)
    .get()
    .then((doc) => {
      postData = doc.data();
    });
  return postData;
};

const fetchUserData = async (uid) => {
  let userData = {};
  await db
    .collection("user")
    .doc(uid)
    .get()
    .then((doc) => {
      console.log(doc.data());
      userData = doc.data();
    });
  return userData;
};

export default fetcher;
export { fetchPostData, fetchUserData };
