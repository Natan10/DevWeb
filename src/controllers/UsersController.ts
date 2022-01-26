import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { User } from "../models/user";
import { verify } from "jsonwebtoken";

interface TokenProps {
  id: number;
  iat: number;
}

class UsersController {
  async create(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const { nome, email, password } = req.body;

    try {
      const userExist = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (userExist) {
        return res.status(400).json({ message: "User já existe!" });
      }

      const user = new User(nome, email, password);
      await prisma.user.create({
        data: {
          nome: user.Nome,
          email: user.Email,
          password: await user.hashPassword(password),
        },
      });

      res.setHeader("Content-Type", "text/html");
      return res.redirect("/entrar");
    } catch (err) {
      return res.status(400).json({ error: "Erro ao criar usuário" });
    }
  }

  async update(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const { userId, nome, email, password } = req.body;

    try {
      const userExist = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!userExist) {
        return res.redirect("/entrar");
      }

      const updateUser = new User(nome, email, password);
      const user = await prisma.user.update ({
        where: { id: userId },
        data: {
          nome: updateUser.Nome,
          email: updateUser.Email,
          password: await updateUser.hashPassword(password),
        },
      });

      return res.status(200).json({data:user});
    } catch (err) {
      return res.status(400).json({ error: "Erro ao atualizar usuário" });
    }      
  }
}

export { UsersController };
