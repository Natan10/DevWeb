import { Router } from "express";
import { UsersController } from "./controllers/UsersController";
import { AuthController } from "./controllers/AuthController";

const router = Router();

router.use(new AuthController().handle);
router.post("/user", new UsersController().create);

export { router };
