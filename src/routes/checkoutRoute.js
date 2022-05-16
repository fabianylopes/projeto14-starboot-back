import { checkout } from "../controllers/checkoutController.js";
import { validateToken } from "../middlewares/validateToken.js";
import { Router } from "express";

const checkoutRouter = Router()

checkoutRouter.post('/checkout', validateToken, checkout)

export default checkoutRouter 