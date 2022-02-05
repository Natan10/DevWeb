import { Router } from "express";
import UserController from "./controllers/UserController";
import PromotionController from "./controllers/PromotionController";

const router = Router();

const User = new UserController();
const Promotion = new PromotionController();

//Login

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
