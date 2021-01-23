import { addNews } from "./services/news";
import { getNews } from "./services/crypto.panic";

var express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  addNews();
  res.send("Hello World!");
});
app.post("/get-news/:currency", async (req, res) => {
  const { currency } = req.params;
  let data = await getNews(currency);
  res.status(200).send(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
