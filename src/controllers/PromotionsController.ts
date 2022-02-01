import { Request, Response } from "express";
import { PrismaClient, Promotion } from "@prisma/client";
import logger from "../logger/logger";

class PromotionController {

  async create(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const { name, price, link, description, userId } = req.body;

    try {
      await prisma.promotion.create({
        data: {
          nome: name,
          preco: Number(price),
          link: link,
          descricao: description,
          userId: userId
        }
      })

      logger.info(`POST /new-promotion - Promoção criada`);

      res.setHeader("Content-Type", "text/html");
      return res.redirect("/admin");
    } catch (e) {
      logger.error(e);
      return res.status(400).json({ error: "Erro ao criar promoção" });
    }
  } 

  async update(req: Request, res: Response) {
    const prisma = new PrismaClient();

    const { name, price, link, description, id, userId } = req.body;

    try {
      await prisma.promotion.update({
        data: {
          nome: name,
          preco: Number(price),
          link: link,
          descricao: description,
          userId: userId
        },
        where: {
          id: Number(id)
        }
      })

      logger.info(`PATCH /edit-promotion - Promoção editada`);

      res.setHeader("Content-Type", "text/html");
      return res.redirect("/admin");
    } catch (e) {
      logger.error(e);
      return res.status(400).json({ error: "Erro ao criar promoção" });
    }
  }

  async getAllPromotions(req: Request, res: Response) {
    const prisma = new PrismaClient();

    try {
      const allPromotions = await prisma.promotion.findMany({
        select: {
          id: true,
          nome: true,
          descricao: true,
          createdAt: true,
        },
      });
      return res.status(200).json(JSON.stringify(allPromotions));
    } catch (err) {
      logger.error(err);
      return res
        .status(400)
        .json({ message: "Não foi possível enviar todos as Promoções" });
    }
  }

  async getAllPromotionsById(req: Request, res: Response) {
    const prisma = new PrismaClient();

    const { userId, isAdmin } = req.body;

    try {
      let promotions: Promotion[] = [];
      if (isAdmin) {
        promotions = await prisma.promotion.findMany();
      } else {
        promotions = await prisma.promotion.findMany({
          where: {
            userId,
          },
        });
      }
      return res.status(200).json(JSON.stringify(promotions));
    } catch (err) {
      logger.error(err);
      return res
        .status(400)
        .json({ message: "Não foi possível carregar as Promoções" });
    }
  }

  async delete(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const { id } = req.params;

    try {
      const promotion = await prisma.promotion.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (promotion) {
        await prisma.promotion.delete({
          where: {
            id: promotion.id,
          },
        });

        logger.info("DELETE /promotion - Promoçao deletada");
        return res.status(204).send();
      }

      logger.info("DELETE /promotion - Promoçao não encontrada");
      return res.status(400).json({ message: "Promoção não encontrada!" });
    } catch (err) {
      logger.error(err);
      return res
        .status(400)
        .json({ error: "Erro ao deletar promoção, tente novamente!" });
    }
  }
}

export { PromotionController };
