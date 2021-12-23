import { Router, Request, Response } from "express";
import { UsersController } from "./controllers/UsersController";
import { SessionsController } from "./controllers/SessionsController";
import { AuthController } from "./controllers/AuthController";

const router = Router();

router.get("/cadastrar", (req: Request, res: Response) => {
  return res.render("signup-screen");
});

router.post("/cadastrar", new UsersController().create);

router.get("/entrar", (req: Request, res: Response) => {
  return res.render("login-screen");
});

// router.post("/cadastrar", (req: Request, res: Response) => {
//   console.log("req", req.body);
//   return res.status(200).send(req.body);
// });

// router.post("/login", new SessionsController().handle);

router.get("/", new AuthController().handler, (req: Request, res: Response) => {
  return res.render("index");
});

export { router };
