import { Request, Response } from "express";
import { PrismaClient, Promotion } from "@prisma/client";
import { HttpStatus } from "../utils/httpStatusCode";

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

      return res
        .status(HttpStatus.Created)
        .json({ promotion: promotionCreated });
    } catch (e) {
      return res
        .status(HttpStatus.BadRequest)
        .json({ error: "Erro ao criar promoção" });
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

      return res.status(HttpStatus.OK).send();
    } catch (e) {
      return res
        .status(HttpStatus.BadRequest)
        .json({ error: "Erro ao editar promoção" });
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
      return res.status(HttpStatus.OK).json({ promotions: allPromotions });
    } catch (err) {
      return res
        .status(HttpStatus.BadRequest)
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
      return res.status(HttpStatus.OK).json({ promotions });
    } catch (err) {
      return res
        .status(HttpStatus.BadRequest)
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

        return res.status(HttpStatus.NoContent).send();
      }

      return res
        .status(HttpStatus.NotFound)
        .json({ message: "Promoção não encontrada!" });
    } catch (err) {
      return res
        .status(HttpStatus.BadRequest)
        .json({ error: "Erro ao deletar promoção, tente novamente!" });
    }
  }
}

export default PromotionController;
