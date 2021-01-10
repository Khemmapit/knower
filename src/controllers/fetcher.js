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
  let userData;
  console.log(id);
  await db
    .collection("post")
    .doc(id)
    .get()
    .then((doc) => {
      postData = doc.data();
      db.collection("user")
        .doc(postData.uid)
        .get()
        .then((user) => {
          console.log(user.data());
          userData = user.data();
        });
    });
  return { ...postData, user: userData };
};

export default fetcher;
export { fetchPostData };
