import { httpClient } from "../lib/http.client";
import { NewsResponse } from "../models/news.response";
import { News } from "../models/news";
import { saveNewsToDB, getNewsById } from "./news";
const config = {
  apiKey: "3a5d5effdc23555e8f1ad6bf6ab93fa3dfb7433b",
  baseUrl: "https://cryptopanic.com/api/v1/posts/",
};
export const getNews = async (currency: string): Promise<News> => {
  let response = await httpClient.get(`${config.baseUrl}`, {
    params: {
      auth_token: config.apiKey,
      currencies: currency,
      kind: "news",
    },
  });
  let result = response.data.results as NewsResponse;
  const lastNews: News = {
    title: result[0].title,
    url: result[0].url,
    id: result[0].id,
    currencies: result[0].currencies,
  };
  saveNewNews(lastNews);
  return lastNews;
};

export const saveNewNews = async (news: News): Promise<News> => {
  let newsFromDb = await getNewsById(news);
  if (!newsFromDb) {
    saveNewsToDB(news);
    //call service to send news to user
  }
  return news;
};
