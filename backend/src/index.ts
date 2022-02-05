import "dotenv/config";
import express, { Request, Response } from "express";
import router from "./routes";
import bodyParser from "body-parser";

const serverPort = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ msg: "Deu bom" });
});

app.listen(serverPort, () => {
  console.log(`Server is Runing localhost:${serverPort}`);
});
