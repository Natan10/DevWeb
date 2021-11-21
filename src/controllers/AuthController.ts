import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";

interface TokenProps {
  id: number;
  iat: number;
}

class AuthController {
  async handle(req: Request, res: Response, next: NextFunction) {
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
        next();
      } else {
        return res.status(400).json("Invalid Token!");
      }
    } catch (err) {
      res.status(400).json("Invalid Token!");
    }
  }
}

export { AuthController };
