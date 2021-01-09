import db from "../firebase";

const fetcher = async (key) => {
  const collections = [];
  await db
    .collection("post")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        collections.push(doc.data());
      });
    });
  return collections;
};

export default fetcher;
