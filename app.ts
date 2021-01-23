import { getNews } from "./services/crypto.panic";
import { getNewsByCurrency } from "./services/news";

var express = require("express");
const app = express();
const port = 3000;

app.get("/news/:currency", async (req, res) => {
  const { currency } = req.params;
  let data = await getNewsByCurrency(currency);
  res.status(200).send(data);
});
app.post("/get-news/:currency", async (req, res) => {
  const { currency } = req.params;
  let data = await getNews(currency);
  res.status(200).send(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
