import express from "express";
import { router } from "./routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(router);
app.use(cors);

app.listen(4000, () => {
  console.log(`Server is runing localhost:${4000}!`);
});
