import { Router } from "express";

import { getCoffees, setCoffees } from "../controllers/coffeesController.js";

const coffeesRouter = Router();

coffeesRouter.get('/coffees', getCoffees);
coffeesRouter.post('/coffees', setCoffees);

export default coffeesRouter;