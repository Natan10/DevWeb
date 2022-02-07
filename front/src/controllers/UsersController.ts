import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { User } from "../models/user";
import logger from "../logger/logger";
import api from "../../config/api";

class UsersController {
  async create(req: Request, res: Response) {
    const { nome, email, password } = req.body;

    try {
      await api.post("/user", {
        nome,
        email,
        password,
      });

      res.setHeader("Content-Type", "text/html");
      return res.redirect("/entrar");
    } catch (err: any) {
      return res.status(400).json({ error: "Erro ao criar usuário" });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { userId, isAdmin } = req.body;

    try {
      await api.delete(`/user/${id}`, {
        data: {
          userId,
          isAdmin,
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
    const { userId, nome, email, password } = req.body;
    try {
      const info = {
        nome: nome !== "" ? nome : undefined,
        email: email !== "" ? email : undefined,
        password:
          password !== "" ? await User.hashPassword(password) : undefined,
      };

      await api.patch("/user", {
        ...info,
        userId,
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
    try {
      const { data } = await api.get("/user");

      logger.info("GET /user - All users");
      return res.status(200).json(JSON.stringify(data.users));
    } catch (err) {
      logger.error(err);
      return res
        .status(400)
        .json({ message: "Não foi possível enviar todos os usuários" });
    }
  }

  async editUser(req: Request, res: Response) {
    const { userId } = req.body;

    try {
      const { data } = await api.get(`/user/${userId}`);
      return res.render("edit-prof", { user: data.user });
    } catch (err) {
      return res.redirect("/entrar");
    }
  }
}

export { UsersController };
