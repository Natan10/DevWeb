import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Utils } from "../utils/passwordHash";

class UsersController {
  constructor(private readonly prismaClient: PrismaClient) {}

  async create(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const { nome, email, password } = req.body;

    try {
      const userExist = await this.prismaClient.user.findFirst({
        where: {
          email,
        },
      });

      if (userExist) {
        return res.status(400).json({ message: "User já existe!" });
      }

      const createdUser = await this.prismaClient.user.create({
        data: {
          nome: nome,
          email: email,
          password: await Utils.hashPassword(password),
        },
      });

      return res.status(201).json({ user: createdUser });
    } catch (err) {
      return res.status(400).json({ error: "Erro ao criar usuário" });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { userId, isAdmin } = req.body;

    try {
      if (Number(id) === Number(userId)) {
        return res
          .status(400)
          .json({ message: "Usuário não pode se deletar!" });
      }

      const userExist = await this.prismaClient.user.findFirst({
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

      await this.prismaClient.user.delete({
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

  async update(req: Request, res: Response) {
    const { userId, nome, email, password } = req.body;

    try {
      const info = {
        nome: nome !== "" ? nome : undefined,
        email: email !== "" ? email : undefined,
        password:
          password !== "" ? await Utils.hashPassword(password) : undefined,
      };

      await this.prismaClient.user.update({
        where: {
          id: Number(userId),
        },
        data: {
          ...info,
        },
      });

      return res.status(204).send();
    } catch (err) {
      return res
        .status(400)
        .json({ error: "Erro ao atualizar informações, tente novamente!" });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const allUsers = await this.prismaClient.user.findMany({
        select: {
          id: true,
          email: true,
          nome: true,
          isAdmin: true,
        },
      });

      return res.status(200).json({ users: allUsers });
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Não foi possível enviar todos os usuários" });
    }
  }
}

export default UsersController;
