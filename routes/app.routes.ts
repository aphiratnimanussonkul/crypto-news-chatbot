import * as express from "express";
import { getNewsByCurrency } from "../services/news";
import { getNewsFromCryptoPanic, getAllNewsFromCryptoPanic } from "../services/crypto.panic";
export const appRoutes = express.Router();

appRoutes.get("/news/:currency", async (req, res) => {
  const { currency } = req.params;
  let data = await getNewsByCurrency(currency);
  res.status(200).send(data);
});

appRoutes.post("/get-news/:currency", async (req, res) => {
  const { currency } = req.params;
  let data = await getNewsFromCryptoPanic(currency);
  res.status(200).send(data);
});

appRoutes.post("/get-news", async (req, res) => {
  let data = await getAllNewsFromCryptoPanic();
  res.status(200).send(data);
});

export default appRoutes;
