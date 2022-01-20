import { Router, Request, Response } from "express";
import { UsersController } from "./controllers/UsersController";
import { SessionsController } from "./controllers/SessionsController";
import { AuthController } from "./controllers/AuthController";
import { PromotionController } from "./controllers/PromotionsController";

const router = Router();

router.get("/cadastrar", (req: Request, res: Response) => {
  return res.render("signup-screen");
});

router.post("/cadastrar", new UsersController().create);
router.get("/get-users", new UsersController().getAllUsers)
router.get("/get-promotions", new PromotionController().getAllPromotions)

router.get("/entrar", (req: Request, res: Response) => {
  return res.render("login-screen");
});

router.post("/entrar", new SessionsController().handler);

router.get("/", (req: Request, res: Response) => {
  return res.render("index");
});

router.get(
  "/admin",
  new AuthController().handler,
  (req: Request, res: Response) => {
    const data = req.body.isAdmin
    return res.render("admin-screen", { data });
  }
);

export { router };
