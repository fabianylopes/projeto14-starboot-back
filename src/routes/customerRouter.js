import { Router } from "express";

import { getUser } from "../controllers/customerController.js";

const customerRouter = Router();

customerRouter.get('/customer', getUser);

export default customerRouter;
