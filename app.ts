import { appRoutes } from "./routes/app.routes";

var express = require("express");
const app = express();
const port = 3000;

app.use("/", appRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
