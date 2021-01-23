export interface NewsResponse {
  results: CryptoPanicNews[];
}

export interface CryptoPanicNews {
  kind: string;
  domain: string;
  votes: Vote;
  source: {
    title: string;
    region: string;
    domain: string;
    path: string;
  };
  title: string;
  published_at: string;
  slug: string;
  currencies: Currency[];
  id: number;
  url: string;
  created_at: string;
}

export interface Currency {
  code: string;
  title: string;
  slug: string;
  url: string;
}

interface Vote {
  negative: number;
  positive: number;
  important: number;
  liked: number;
  disliked: number;
  lol: 1;
  toxic: number;
  saved: number;
  comments: number;
}
