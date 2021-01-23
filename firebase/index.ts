import firebase from "firebase/app";
import "firebase/firestore";
const config = {
  apiKey: "<Your API KEY>",
  databaseURL: "https://<Yout Project ID>.firebaseio.com",
  projectId: "<Yout Project ID>",
  appId: "<Your APP ID>",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const firestore = firebase.firestore();

export default {
  firestore,
};