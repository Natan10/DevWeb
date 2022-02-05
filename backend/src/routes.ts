import { Router } from "express";
import UserController from "./controllers/UserController";
import { PrismaClient } from "@prisma/client";

const router = Router();

const User = new UserController();

router.post("/user", User.create);

export default router;
