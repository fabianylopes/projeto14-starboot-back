import { Router } from "express";

import { checkout } from "../controllers/checkoutController.js";
import { validateToken } from "../middlewares/validateToken.js";

const checkoutRouter = Router();

checkoutRouter.post('/checkout', validateToken, checkout);

export default checkoutRouter;