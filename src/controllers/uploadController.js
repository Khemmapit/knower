import firebase from "firebase";
import db from "../firebase";

export const uploadFile = async (fileBlob, filePath) => {
  const storageRef = firebase.storage().ref();
  const newFileRef = storageRef.child(filePath + "/" + fileBlob.name);
  try {
    await newFileRef.put(fileBlob);
  } catch (err) {
    throw err;
  }
};

const createPost = async (title, description, tags, fileBlob, filePath) => {
  try {
    await uploadFile(fileBlob, filePath);
    await db.collection("post").add({
      uid: "",
      title: title,
      tags: tags,
      description: description,
      collect: [],
      getIt: [],
      type: fileBlob.type,
      timestamp: Date.now(),
      mediaURL: filePath + "/" + fileBlob.name,
    });
    return null;
  } catch (err) {
    return err;
  }
};

export default createPost;
