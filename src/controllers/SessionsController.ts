import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { User } from "../models/user";
import { sign } from "jsonwebtoken";

class SessionsController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    const prisma = new PrismaClient();

    try {
      const user = await prisma.user.findFirst({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!!!" });
      }

      if (await User.comparePassword(password, user.password)) {
        const token = sign(
          {
            id: user.id,
          },
          process.env.JWT_SECRET?.toString() || ""
        );
        return res.json({ token });
      } else {
        return res.status(401).json("Password incorreto!");
      }
    } catch (err) {
      return res.status(500).json({ error: "Erro ao logar!" });
    }
  }
}

export { SessionsController };
