import { Router, Request, Response } from "express";
import { UsersController } from "./controllers/UsersController";
import { SessionsController } from "./controllers/SessionsController";
import { AuthController } from "./controllers/AuthController";
import { PromotionController } from "./controllers/PromotionsController";
import { PrismaClient } from "@prisma/client";
import logger from "./logger/logger";

const router = Router();
const prisma = new PrismaClient();

router.get("/cadastrar", (req: Request, res: Response) => {
  logger.info("GET /cadastrar");
  return res.render("signup-screen");
});
router.post("/cadastrar", new UsersController().create);

router.get("/entrar", (req: Request, res: Response) => {
  logger.info("GET /entrar");
  return res.render("login-screen");
});
router.post("/entrar", new SessionsController().handler);

router.get("/", async (req: Request, res: Response) => {
  logger.info("GET /");
  const promotions = await prisma.promotion.findMany();

  return res.render("index", { promotions });
});

// Middleware
router.use(new AuthController().handler);

router.get("/admin", (req: Request, res: Response) => {
  logger.info("GET /admin");
  const data = req.body.isAdmin;
  return res.render("admin-screen", { data });
});

router.get("/editar", async (req: Request, res: Response) => {
  const { userId } = req.body;
  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  return res.render("edit-prof", { user });
});

router.patch("/user", new UsersController().update);

router.get("/get-users", new UsersController().getAllUsers);

router.get("/user-promotions", new PromotionController().getAllPromotionsById);

router.get("/new-promotion", (req: Request, res: Response) => {
  res.render("addPromotions")
});

router.post("/new-promotion", new PromotionController().create)

router.get("/edit-promotion", async (req: Request, res: Response) => {
  const id = req.query.id
  const promotion = await prisma.promotion.findFirst({
    where: {
      id: Number(id)
    }
  });
  res.render("editPromotions", { promotion, id })
})

router.post("/edit-promotion", new PromotionController().update)

router.delete("/user/:id", new UsersController().delete);

router.delete("/promotion/:id", new PromotionController().delete);

export { router };
