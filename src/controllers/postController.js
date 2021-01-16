import firebase from "firebase";

const storage = firebase.storage();

export const getFileUrl = async (filePath) => {
  const pathReference = storage.ref(filePath);
  const url = await pathReference.getDownloadURL();
  return url;
};

const getPost = async () => {
  const querySnapshot = await db.collection("post").get();
  const postData = querySnapshot.map(async (doc) => {
    const post = doc.data();
    try {
      post.mediaURL = await getFileUrl(post.mediaURL);
    } catch (err) {
      post.mediaURL = "";
    }
    return post;
  });
  return postData;
};

export default getPost;
