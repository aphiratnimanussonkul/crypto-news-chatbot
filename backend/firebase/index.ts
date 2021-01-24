import firebase from "firebase/app";
import "firebase/firestore";
const config = {
  apiKey: "d1e8d7ba65b37e78ef124f543488065100b51108",
  databaseURL: "https://crypto-news-chatbot.firebaseio.com",
  projectId: "crypto-news-chatbot",
  // appId: "<Your APP ID>",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const firestore = firebase.firestore();

export default {
  firestore,
};