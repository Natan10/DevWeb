import { Router } from "express";
import SessionsController from "./controllers/SessionController";
import UserController from "./controllers/UserController";
import PromotionController from "./controllers/PromotionController";
import AuthController from "./controllers/AuthController";

const router = Router();

const User = new UserController();
const Promotion = new PromotionController();
const Session = new SessionsController();
const Auth = new AuthController();

//Login
router.post("/login", Session.handler);

// Auth Middleware
router.use(Auth.handler);

// User
router.get("/user", User.getAllUsers);
router.post("/user", User.create);
router.patch("/user", User.update);
router.delete("/user/:id", User.delete);

// Promotion
router.get("/promotion", Promotion.getAllPromotions);
router.get("/promotionId", Promotion.getAllPromotionsById);
router.post("/promotion", Promotion.create);
router.put("/promotion", Promotion.update);
router.delete("/promotion/:id", Promotion.delete);

export default router;
