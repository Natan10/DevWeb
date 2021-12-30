import "dotenv/config";
import express from "express";
import { router } from "./routes";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);

app.listen(4000, () => {
  console.log(`Server is runing localhost:${4000}!`);
});
