import { Request, Response } from "express";
import logger from "../logger/logger";
import api from "../../config/api";

class PromotionController {
  async create(req: Request, res: Response) {
    const { name, price, link, description, userId } = req.body;

    try {
      await api.post("/promotion", {
        name,
        price,
        link,
        description,
        userId,
      });
      logger.info(`POST /new-promotion - Promoção criada`);
      res.setHeader("Content-Type", "text/html");
      return res.redirect("/admin");
    } catch (e) {
      logger.error(e);
      return res.status(400).json({ error: "Erro ao criar promoção" });
    }
  }

  async update(req: Request, res: Response) {
    const { name, price, link, description, id, userId } = req.body;

    try {
      await api.put(`/promotion/${id}`, {
        name,
        price,
        link,
        description,
        userId,
      });

      logger.info(`PATCH /edit-promotion - Promoção editada`);
      res.setHeader("Content-Type", "text/html");
      return res.redirect("/admin");
    } catch (e) {
      logger.error(e);
      return res.status(400).json({ error: "Erro ao criar promoção" });
    }
  }

  async getAllPromotions(req: Request, res: Response) {
    try {
      const { data } = await api.get("/promotion");
      return res.status(200).json(JSON.stringify(data.promotions));
    } catch (err) {
      logger.error(err);
      return res
        .status(400)
        .json({ message: "Não foi possível enviar todos as Promoções" });
    }
  }

  async getAllPromotionsById(req: Request, res: Response) {
    const { userId, isAdmin } = req.body;

    try {
      const { data } = await api.get("/promotionId", {
        data: {
          userId,
          isAdmin,
        },
      });

      return res.status(200).json(JSON.stringify(data.promotions));
    } catch (err) {
      logger.error(err);
      return res
        .status(400)
        .json({ message: "Não foi possível carregar as Promoções" });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { status } = await api.delete(`/promotion/${id}`);
      return res.status(status).send();
    } catch (err) {
      logger.error(err);
      return res
        .status(400)
        .json({ error: "Erro ao deletar promoção, tente novamente!" });
    }
  }

  async editPromotion(req: Request, res: Response) {
    const { id } = req.query;

    try {
      const { data } = await api.get(`/promotion/${id}`);

      res.render("editPromotions", { promotion: data.promotion, id });
    } catch (err) {
      return res.redirect("/entrar");
    }
  }
}

export { PromotionController };
