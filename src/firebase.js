import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBzzeBJsDFBxbShMfJ6Y1YQo3OaEIdBhVg",
  authDomain: "knower-test.firebaseapp.com",
  projectId: "knower-test",
  storageBucket: "knower-test.appspot.com",
  messagingSenderId: "646617611600",
  appId: "1:646617611600:web:7df241548fc74006098055",
  measurementId: "G-46GTYNF47F",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
export default db;
