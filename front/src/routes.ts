import { Router, Request, Response } from "express";
import { UsersController } from "./controllers/UsersController";
import { SessionsController } from "./controllers/SessionsController";
import { AuthController } from "./controllers/AuthController";
import { PromotionController } from "./controllers/PromotionsController";
import logger from "./logger/logger";
import api from "../config/api";

const router = Router();

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

  let promotions = [];

  try {
    const { data } = await api.get("/promotion");
    promotions = data.promotions;
  } catch (err) {
    logger.error(err);
    promotions = [];
  }
  return res.render("index", { promotions });
});

// Middleware
router.use(new AuthController().handler);

router.get("/admin", (req: Request, res: Response) => {
  logger.info("GET /admin");
  const data = req.body.isAdmin;
  return res.render("admin-screen", { data });
});

router.get("/editar", new UsersController().editUser);

router.patch("/user", new UsersController().update);
router.patch("/userAvatar/:id", new UsersController().updateAvatar);

router.get("/get-users", new UsersController().getAllUsers);

router.get("/user-promotions", new PromotionController().getAllPromotionsById);

router.get("/new-promotion", (req: Request, res: Response) => {
  res.render("addPromotions");
});

router.post("/new-promotion", new PromotionController().create);

router.get("/edit-promotion", new PromotionController().editPromotion);

router.post("/edit-promotion", new PromotionController().update);

router.delete("/user/:id", new UsersController().delete);

router.delete("/promotion/:id", new PromotionController().delete);

export { router };
