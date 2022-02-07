import { Request, Response } from "express";
import { prisma } from "../config/db";
import { Promotion } from "@prisma/client";
import { HttpStatus } from "../utils/httpStatusCode";

class PromotionController {
  async create(req: Request, res: Response) {
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
    const { id } = req.params;
    const { name, price, link, description, userId } = req.body;

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
    try {
      const allPromotions = await prisma.promotion.findMany();
      return res.status(HttpStatus.OK).json({ promotions: allPromotions });
    } catch (err) {
      return res
        .status(HttpStatus.BadRequest)
        .json({ message: "Não foi possível enviar todos as Promoções" });
    }
  }

  async getAllPromotionsById(req: Request, res: Response) {
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

        return res.status(HttpStatus.OK).send();
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

  async getPromotion(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const promotion = await prisma.promotion.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!promotion) {
        return res.status(HttpStatus.NotFound).send();
      }
      return res.status(HttpStatus.OK).json({ promotion });
    } catch (err) {
      res
        .status(HttpStatus.BadRequest)
        .json({ message: "Não foi possível realizar a requisição!" });
    }
  }
}
export default PromotionController;
