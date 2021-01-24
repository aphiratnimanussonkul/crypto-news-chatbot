import { Currency } from "./news.response";

export interface News {
  title: string;
  url: string;
  id: number;
  currencies: Currency[];
}
