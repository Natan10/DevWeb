import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Utils } from "../utils/passwordHash";
import { sign } from "jsonwebtoken";

class SessionController {
  async handler(req: Request, res: Response) {
    const prisma = new PrismaClient();

    const { email, password } = req.body;

    try {
      const user = await prisma.user.findFirst({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      if (await Utils.comparePassword(password, user.password)) {
        const token = sign(
          {
            id: user.id,
          },
          process.env.JWT_SECRET?.toString() || ""
        );

        return res.status(200).json({ token });
      } else {
        return res.status(401).json({ message: "Password incorreto!" });
      }
    } catch (err) {
      return res.status(500).json({ error: "Erro ao logar!" });
    }
  }
}

export default SessionController;
