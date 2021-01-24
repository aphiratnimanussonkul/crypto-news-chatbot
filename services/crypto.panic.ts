import { httpClient } from "../lib/http.client";
import { NewsResponse } from "../models/news.response";

const config = {
  apiKey: "3a5d5effdc23555e8f1ad6bf6ab93fa3dfb7433b",
  baseUrl: "https://cryptopanic.com/api/v1/posts/",
};

export const getAllNewsFromCryptoPanic = async (): Promise<NewsResponse> => {
  let response = await httpClient.get(`${config.baseUrl}`, {
    params: {
      auth_token: config.apiKey,
      kind: "news",
    },
  });
  let result = response.data as NewsResponse;
  return result;
};

export const getNewsFromCryptoPanic = async (
  currency: string
): Promise<NewsResponse> => {
  let response = await httpClient.get(`${config.baseUrl}`, {
    params: {
      auth_token: config.apiKey,
      currencies: currency,
      kind: "news",
    },
  });
  let result = response.data.results as NewsResponse;
  return result;
};
