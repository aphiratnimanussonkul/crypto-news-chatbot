import firebase from "../firebase/index";
import { News } from "../models/news";
import { Currency } from "../models/news.response";

const { firestore } = firebase;

export const saveNewsToDB = async (news: News) => {
  try {
    await firestore.collection("news").doc(news.id.toString()).set(news);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getNewsById = async (news: News) => {
  try {
    let getNewsResult;
    await firestore
      .collection("news")
      .where("id", "==", news.id)
      .get()
      .then((result) => {
        result.docs.map((data) => {
          getNewsResult = data.data();
        });
      });
    return getNewsResult;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getNewsByCurrency = async (currencyCode: string) => {
  try {
    let getNewsResult = [];
    await firestore
      .collection("news")
      .get()
      .then((result) => {
        result.docs.map((data) => {
          getNewsResult.push(data.data());
        });
      });
    return getNewsResult.filter((news: News) =>
      news.currencies.find(
        (currency: Currency) => currency.code == currencyCode
      )
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};
