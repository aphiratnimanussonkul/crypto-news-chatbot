import {
  getNewsFromCryptoPanic,
  getAllNewsFromCryptoPanic,
} from "../services/crypto.panic";
import { CryptoPanicNews } from "../models/news.response";
import { getNewsById, saveNewsToDB } from "../services/news";
import { getUserInfo } from "../services/user";
import { News } from "../models/news";
import { UserInfo } from "../models/user";
import { sendMessageToUser } from "../services/messenging.api";

export const sendLastNewsToUser = async (news: News) => {
  let user: UserInfo = await getUserInfo();
  if (user) {
    news.currencies.forEach((currency) => {
      if (user.favoriteCoin == currency.code) {
        let message = `${news.url} \n ${news.url}`;
        sendMessageToUser(message, user.id);
      }
    });
  }
};

export const intervalGetNews5Min = () => {
  setInterval(async () => {
    console.log("On interval get news from crypto panic");
    let newsFromCryptoPanic = await getAllNewsFromCryptoPanic();
    let lastNews = await saveLastNews(newsFromCryptoPanic.results);
    if (lastNews.isHaveNewNews) {
      sendLastNewsToUser(lastNews.news);
    }
  }, 10000);
};

const saveLastNews = async (
  news: CryptoPanicNews[]
): Promise<{ isHaveNewNews: boolean; news: News }> => {
  let newsOnDB = await getNewsById(news[0]);
  let isHaveNewNews = false;
  if (!newsOnDB) {
    let newsDetail: News = {
      title: news[0].title,
      url: news[0].url,
      id: news[0].id,
      currencies: news[0].currencies,
    };
    await saveNewsToDB(newsDetail);
    isHaveNewNews = true;
  }
  return {
    isHaveNewNews: isHaveNewNews,
    news: news[0],
  };
};
