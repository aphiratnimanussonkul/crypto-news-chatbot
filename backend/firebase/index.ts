import firebase from "firebase/app";
import "firebase/firestore";
const config = {
  apiKey: "d92340f0a74c6687f421636442371bfb6e28fdaf",
  databaseURL: "https://kittitorn-fmefkd.firebaseio.com",
  projectId: "kittitorn-fmefkd",
  // appId: "<Your APP ID>",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const firestore = firebase.firestore();

export default {
  firestore,
};