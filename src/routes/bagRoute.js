import { createBag, setBag } from "../controllers/bagController.js";
import { checkAvaliability } from "../middlewares/validateBag.js";
import { Router } from "express";

const bagRouter = Router()

bagRouter.post('/bag', createBag)
bagRouter.post('/bag',checkAvaliability, setBag)


export default bagRouter