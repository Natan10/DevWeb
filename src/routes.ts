import { Router, Request, Response } from "express";
import { UsersController } from "./controllers/UsersController";
import { SessionsController } from "./controllers/SessionsController";
import { AuthController } from "./controllers/AuthController";

const router = Router();

// router.get("/", (req: Request, res: Response) => {
//   return res.render("index");
// });

router.get("/cadastrar", (req: Request, res: Response) => {
  return res.render("signup-screen");
});

router.post("/cadastrar", new UsersController().create);

router.get("/entrar", (req: Request, res: Response) => {
  return res.render("login-screen");
});

router.post("/entrar", new SessionsController().handler);

router.get("/", new AuthController().handler, (req: Request, res: Response) => {
  return res.render("index");
});

export { router };
