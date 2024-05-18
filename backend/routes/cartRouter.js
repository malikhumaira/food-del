import express from "express";
import { addToCart, delFromCart, getCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router()

cartRouter.post("/add",authMiddleware, addToCart);
cartRouter.post("/del",authMiddleware, delFromCart);
cartRouter.post("/get",authMiddleware, getCart)

export default cartRouter;