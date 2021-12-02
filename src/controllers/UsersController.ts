import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { User } from "../models/user";

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
        return res.json({ message: "User já existe!" });
      }

      const user = new User(nome, email, password);
      await prisma.user.create({
        data: {
          nome: user.Nome,
          email: user.Email,
          password: await user.hashPassword(password),
        },
      });

      return res.status(201).json({
        user: {
          nome: user.Nome,
          email: user.Email,
          isAdmin: user.IsAdmin,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Erro ao criar user" });
    }
  }
}

export { UsersController };
