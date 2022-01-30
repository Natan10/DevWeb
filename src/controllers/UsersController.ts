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
        return res.status(400).json({ message: "User já existe!" });
      }

      const user = new User(nome, email, password);
      await prisma.user.create({
        data: {
          nome: user.Nome,
          email: user.Email,
          password: await User.hashPassword(password),
        },
      });

      res.setHeader("Content-Type", "text/html");
      return res.redirect("/entrar");
    } catch (err) {
      return res.status(400).json({ error: "Erro ao criar usuário" });
    }
  }

  async delete(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const { id } = req.params;
    const { userId, isAdmin } = req.body;

    try {
      if (Number(id) === Number(userId)) {
        return res
          .status(400)
          .json({ message: "Usuário não pode se deletar!" });
      }

      const userExist = await prisma.user.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!userExist) {
        return res.status(400).json({ message: "User não encontrado!" });
      }

      if (!isAdmin) {
        return res.status(404).json({ message: "Usuário não authorizado!" });
      }

      await prisma.user.delete({
        where: {
          id: userExist.id,
        },
      });

      return res.status(204).send();
    } catch (err) {
      return res
        .status(400)
        .json({ error: "Erro ao deletar usuário, tente novamente!" });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    const prisma = new PrismaClient();

    try {
      const allUsers = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          nome: true,
          isAdmin: true,
        },
      });
      return res.status(200).json(JSON.stringify(allUsers));
    } catch {
      return res
        .status(400)
        .json({ message: "Não foi possível enviar todos os usuários" });
    }
  }
}

export { UsersController };
