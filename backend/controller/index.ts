import { News } from "../models/news";
import { CryptoPanicNews } from "../models/news.response";
import { UserInfo } from "../models/user";
import { getAllNewsFromCryptoPanic } from "../services/crypto.panic";
import { sendMessageToUser } from "../services/messenging.api";
import { getNewsById, saveNewsToDB } from "../services/news";
import { getUserInfo } from "../services/user";
var shortUrl = require("node-url-shortener");

export const sendLastNewsToUser = async (news: News) => {
  let user: UserInfo = await getUserInfo();
  if (user && news?.currencies) {
    news.currencies.forEach((currency) => {
      if (user.favoriteCoins.find((coin) => coin == currency.code)) {
        news.created_at = new Date(news.created_at).toLocaleString();
        shortUrl.short(news.url, async function (err, url) {
          let message = `published at: ${news.created_at}\n ${news.title} \n ${url}`;
          sendMessageToUser(message, user.id);
        });
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
      created_at: new Date(news[0].created_at).toLocaleString(),
    };
    await saveNewsToDB(newsDetail);
    isHaveNewNews = true;
  }
  return {
    isHaveNewNews: isHaveNewNews,
    news: news[0],
  };
};
