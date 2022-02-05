import { Request, Response } from "express";
import logger from "../logger/logger";
import api from "../../config/api";

class SessionsController {
  async handler(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const { data } = await api.post("/login", {
        email,
        password,
      });

      if (data.token) {
        res.cookie("userToken", data.token, {
          httpOnly: true,
          expires: new Date(2000000 + Date.now()),
        });
      }
      return res.redirect("/admin");
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ error: "Erro ao logar!" });
    }
  }
}

export { SessionsController };
