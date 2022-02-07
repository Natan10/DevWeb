import { Request, Response, NextFunction } from "express";
import logger from "../logger/logger";
import api from "../../config/api";

class AuthController {
  async handler(req: Request, res: Response, next: NextFunction) {
    try {
      const authToken = req.cookies.userToken;

      if (!authToken) {
        throw new Error("Authentication failed!");
      }

      const response = await api.post("/auth", {
        token: authToken,
      });

      const { data } = response;
      const { user } = data;

      if (user) {
        req.body.userId = user.id;
        req.body.isAdmin = user.isAdmin;
        next();
      } else {
        return res.redirect("/entrar");
      }
    } catch (err) {
      logger.error(err);
      return res.redirect("/entrar");
    }
  }
}

export { AuthController };
