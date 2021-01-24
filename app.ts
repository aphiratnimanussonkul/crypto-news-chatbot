import { appRoutes } from "./routes/app.routes";
import { intervalGetNews5Min } from "./controller";

var express = require("express");
const app = express();
const port = 3000;

intervalGetNews5Min();

app.use("/", appRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
