import express, { Request, Response } from "express";

const serverPort = 3000;
const app = express();

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ msg: "Deu bom" });
});

app.listen(serverPort, () => {
  console.log(`Server is Runing localhost:${serverPort}`);
});
