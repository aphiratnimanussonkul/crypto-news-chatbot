import { addNews } from "./services/news";
import { getNews } from "./services/crypto.panic";

var express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  addNews();
  res.send("Hello World!");
});
app.get("/get-news", async (req, res) => {
  let data = await getNews();
  res.status(200).send(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
