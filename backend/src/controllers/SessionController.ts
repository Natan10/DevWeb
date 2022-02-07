import { Request, Response } from "express";
import { prisma } from "../../config/db";
import { Utils } from "../utils/passwordHash";
import { sign } from "jsonwebtoken";
import { HttpStatus } from "../utils/httpStatusCode";

class SessionController {
  async handler(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findFirst({
        where: { email },
      });

      if (!user) {
        return res
          .status(HttpStatus.NotFound)
          .json({ message: "Usuário não encontrado!" });
      }

      if (await Utils.comparePassword(password, user.password)) {
        const token = sign(
          {
            id: user.id,
          },
          process.env.JWT_SECRET?.toString() || ""
        );

        return res.status(HttpStatus.OK).json({ token });
      } else {
        return res
          .status(HttpStatus.Unauthorized)
          .json({ message: "Password incorreto!" });
      }
    } catch (err) {
      return res
        .status(HttpStatus.BadRequest)
        .json({ error: "Erro ao logar!" });
    }
  }
}

export default SessionController;
