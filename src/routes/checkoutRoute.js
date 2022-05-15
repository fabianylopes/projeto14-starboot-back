import { checkout } from "../controllers/checkoutController.js";
import { Router } from "express";

const checkoutRouter = Router()

checkoutRouter.post('/checkout', checkout)

export default checkoutRouter 