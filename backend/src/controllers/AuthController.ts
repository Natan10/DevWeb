import { Request, Response } from "express";
import { prisma } from "../config/db";
import { verify } from "jsonwebtoken";
import { HttpStatus } from "../utils/httpStatusCode";
import { getKey, setKey } from "../config/cache";

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

      const cachedUser = await getKey(`user-${id}`);

      if (cachedUser) {
        return res.status(200).json({ user: JSON.parse(cachedUser) });
      }

      const user = await prisma.user.findFirst({
        where: { id },
      });

      if (user) {
        // Salvando no cache
        await setKey(`user-${id}`, user, 60 * 10);

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
