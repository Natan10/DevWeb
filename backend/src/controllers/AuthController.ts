import { Request, Response } from "express";
import { prisma } from "../../config/db";
import { verify } from "jsonwebtoken";
import { HttpStatus } from "../utils/httpStatusCode";

interface TokenProps {
  id: number;
  iat: number;
}

class AuthController {
  async handler(req: Request, res: Response) {
    const secret = process.env.JWT_SECRET?.toString() || "";

    try {
      const { token } = req.body;
      const { id } = verify(token, secret) as TokenProps;

      const user = await prisma.user.findFirst({
        where: { id },
      });

      if (user) {
        return res.status(200).json({ user });
      } else {
        return res.status(HttpStatus.Unauthorized).send();
      }
    } catch (err) {
      return res.status(HttpStatus.BadRequest).send();
    }
  }
}

export default AuthController;
