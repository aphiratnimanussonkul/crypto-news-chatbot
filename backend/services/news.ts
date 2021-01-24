import firebase from "../firebase/index";
import { News } from "../models/news";
import { Currency } from "../models/news.response";
var shortUrl = require("node-url-shortener");

const { firestore } = firebase;

export const saveNewsToDB = async (news: News) => {
  try {
    shortUrl.short(news.url, async function (err, url) {
      news.url = url;
      await firestore.collection("news").doc(news.id.toString()).set(news);
    });
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

export const getNewsByCurrency = async (
  currencyCode: string
): Promise<News> => {
  try {
    let getNewsResult = [];
    await firestore
      .collection("news")
      .limit(5)
      .get()
      .then((result) => {
        result.docs.map((data) => {
          getNewsResult.push(data.data());
        });
      });
    getNewsResult = getNewsResult
      .reverse()
      .filter((news: News) =>
        news.currencies.find(
          (currency: Currency) => currency.code == currencyCode
        )
      );
    if (getNewsResult[0]) {
      return getNewsResult[0];
    }
    return {
      title: "ยังไม่มีข่าวใหม่เกี่ยวกับเหรียญ " + currencyCode,
      currencies: [],
      id: null,
      url: "",
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
