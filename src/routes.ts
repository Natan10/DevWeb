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

router.get("/editar", (req: Request, res: Response) => {
  return res.render("edit-prof");
});

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

router.get("/admin", async (req: Request, res: Response) => {
  logger.info("GET /admin");
  const data = req.body.isAdmin;
  const promotions = await prisma.promotion.findMany();
  return res.render("admin-screen", { data, promotions });
});

router.get("/get-users", new UsersController().getAllUsers);

router.get("/user-promotions", new PromotionController().getAllPromotionsById);

router.delete("/user/:id", new UsersController().delete);

router.delete("/promotion/:id", new PromotionController().delete);

export { router };
