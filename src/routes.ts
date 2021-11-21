import { Router } from "express";
import { UsersController } from "./controllers/UsersController";
import { SessionsController } from "./controllers/SessionsController";
import { AuthController } from "./controllers/AuthController";

const router = Router();

router.post("/signUp", new UsersController().create);
router.post("/signIn", new SessionsController().handle);

router.get("/test", new AuthController().handle, (req, res) => {
  return res.json({ userId: req.body.userId });
});

export { router };
