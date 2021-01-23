import { httpClient } from "../lib/http.client";
const config = {
  apiKey: "3a5d5effdc23555e8f1ad6bf6ab93fa3dfb7433b",
  baseUrl: "https://cryptopanic.com/api/v1/posts/",
  //   https://cryptopanic.com/api/v1/posts/?auth_token=a7e15b7cabe10166a7cdc0035afbd062426256f3&currencies=BTC&kind=news
};
export const getNews = async () => {
  let response = await httpClient.get(`${config.baseUrl}`, {
    params: {
      auth_token: config.apiKey,
      currencies: "BTC",
      kind: "news",
    },
  });
  console.log(response.data);
  return response.data;
};
