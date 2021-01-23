import firebase from "../firebase/index";

const { firestore } = firebase;

export const addNews = async () => {
  let id = "testid1";
  try {
    await firestore
      .collection(`news/ETC/${id}`)
      .add({
        title: "Hello this is news",
        content: "test news",
      })
      .then((result) => {
        console.log(result);
      });
  } catch (error) {}
};

