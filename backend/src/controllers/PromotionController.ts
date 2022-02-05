import { Request, Response } from "express";
import { PrismaClient, Promotion } from "@prisma/client";

class PromotionController {
  async create(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const { name, price, link, description, userId } = req.body;

    try {
      const promotionCreated = await prisma.promotion.create({
        data: {
          nome: name,
          preco: Number(price),
          link: link,
          descricao: description,
          userId: userId,
        },
      });

      return res.status(201).json({ promotion: promotionCreated });
    } catch (e) {
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
          userId: userId,
        },
        where: {
          id: Number(id),
        },
      });

      return res.status(200).send();
    } catch (e) {
      return res.status(400).json({ error: "Erro ao editar promoção" });
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
      return res.status(200).json({ promotions: allPromotions });
    } catch (err) {
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
      return res.status(200).json({ promotions });
    } catch (err) {
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

        return res.status(204).send();
      }

      return res.status(400).json({ message: "Promoção não encontrada!" });
    } catch (err) {
      return res
        .status(400)
        .json({ error: "Erro ao deletar promoção, tente novamente!" });
    }
  }
}

export default PromotionController;
