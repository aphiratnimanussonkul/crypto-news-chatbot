import firebase from "../firebase/index";
import { UserInfo } from "../models/user";

const { firestore } = firebase;

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    let getUserResult: UserInfo;
    await firestore
      .collection("users")
      .doc("bb1SMPu9BnxZemoxEzHd")
      .get()
      .then((result) => {
        getUserResult = {
          id: result.data().id,
          name: result.data().name,
          favoriteCoins: result.data().favoriteCoins,
        };
      });
    return getUserResult;
  } catch (error) {
    console.log(error);
    return null;
  }
};
