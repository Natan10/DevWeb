import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { User } from "../models/user";
import logger from "../logger/logger";

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
        logger.error(`POST /cadastrar - User já existe`);
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

      logger.info(`POST /cadastrar - User criado`);

      res.setHeader("Content-Type", "text/html");
      return res.redirect("/entrar");
    } catch (err) {
      logger.error(err);
      return res.status(400).json({ error: "Erro ao criar usuário" });
    }
  }

  async delete(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const { id } = req.params;
    const { userId, isAdmin } = req.body;

    try {
      if (Number(id) === Number(userId)) {
        logger.warn(`DELETE /user - User não pode se deletar`);
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
        logger.info(`DELETE /user - User não encontrado`);
        return res.status(400).json({ message: "User não encontrado!" });
      }

      if (!isAdmin) {
        logger.info(`DELETE /user - User não autorizado`);
        return res.status(404).json({ message: "Usuário não authorizado!" });
      }

      await prisma.user.delete({
        where: {
          id: userExist.id,
        },
      });

      logger.info(`DELETE /user - User deletado`);
      return res.status(204).send();
    } catch (err) {
      logger.error(err);
      return res
        .status(400)
        .json({ error: "Erro ao deletar usuário, tente novamente!" });
    }
  }

  async update(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const { userId, nome, email, password } = req.body;

    try {
      const info = {
        nome: nome !== "" ? nome : undefined,
        email: email !== "" ? email : undefined,
        password:
          password !== "" ? await User.hashPassword(password) : undefined,
      };

      await prisma.user.update({
        where: {
          id: Number(userId),
        },
        data: {
          ...info,
        },
      });

      logger.info(`PATCH /user - User atualizado`);
      return res.status(204).send();
    } catch (err) {
      logger.error(err);
      return res
        .status(400)
        .json({ error: "Erro ao atualizar informações, tente novamente!" });
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

      logger.info("GET /user - All users");
      return res.status(200).json(JSON.stringify(allUsers));
    } catch (err) {
      logger.error(err);
      return res
        .status(400)
        .json({ message: "Não foi possível enviar todos os usuários" });
    }
  }
}

export { UsersController };
