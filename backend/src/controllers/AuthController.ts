import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { HttpStatus } from "../utils/httpStatusCode";

interface TokenProps {
  id: number;
  iat: number;
}

class AuthController {
  async handler(req: Request, res: Response, next: NextFunction) {
    const prisma = new PrismaClient();
    const secret = process.env.JWT_SECRET?.toString() || "";

    try {
      const authToken = req.headers.authorization?.split(" ")[1];
      if (!authToken) {
        throw new Error("Authentication failed!");
      }

      const { id } = verify(authToken, secret) as TokenProps;

      const user = await prisma.user.findFirst({
        where: { id },
      });

      if (user) {
        req.body.userId = user.id;
        req.body.isAdmin = user.isAdmin;
        next();
      } else {
        return res.status(HttpStatus.Unauthorized).send();
      }
    } catch (err) {
      return res.status(HttpStatus.BadRequest).send();
    }
  }
}

export default AuthController;
