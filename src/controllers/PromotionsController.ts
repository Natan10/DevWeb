import { Request, Response } from "express";
import { PrismaClient, Promotion } from "@prisma/client";
import logger from "../logger/logger";

class PromotionController {
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
