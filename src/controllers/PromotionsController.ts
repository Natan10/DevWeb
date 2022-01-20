import { Request, Response} from "express";
import { PrismaClient } from "@prisma/client";

class PromotionController {
    async getAllPromotions(req: Request, res: Response) {
        const prisma = new PrismaClient();
    
        try {
          const allPromotions = await prisma.promotion.findMany({
            select: {
              id: true,
              nome: true,
              Descricao: true,
              createdAt: true
            }
          })
          return res.status(200).json(JSON.stringify(allPromotions))
        } catch {
          return res.status(400).json({message: "Não foi possível enviar todos as Promoções"})
        }
      }
}

export { PromotionController }