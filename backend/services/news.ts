import firebase from "../firebase/index";
import { News } from "../models/news";
import { Currency } from "../models/news.response";
import { sendMessageToUser } from "./messenging.api";
var shortUrl = require("node-url-shortener");

const { firestore } = firebase;

export const saveNewsToDB = async (news: News) => {
  try {
    shortUrl.short(news.url, async function (err, url) {
      news.currencies = news.currencies ?? []
      news.url = url;
      await firestore
        .collection("news")
        .doc(news.id.toString())
        .set(news)
        .catch(() => {});
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
): Promise<News[]> => {
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
    getNewsResult = getNewsResult
      .reverse()
      .filter((news: News) =>
        news.currencies.find(
          (currency: Currency) => currency.code == currencyCode
        )
      );
    if (getNewsResult.length) {
      let lastNewIndex = getNewsResult.length >= 5 ? 5 : getNewsResult.length;
      for (let i = 0; i < lastNewIndex; i++) {
        let message = `${getNewsResult[i].title} \n ${getNewsResult[i].url}`;
        await sendMessageToUser(message, 2640677152657766);
      }
      return getNewsResult.slice(0, lastNewIndex) as News[];
    }
    return [
      {
        title: "ยังไม่มีข่าวใหม่เกี่ยวกับเหรียญ " + currencyCode,
        currencies: [],
        id: null,
        url: "",
      },
    ];
  } catch (error) {
    console.log(error);
    return null;
  }
};
