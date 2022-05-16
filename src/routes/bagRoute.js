import { createBag, setBag, getBag } from "../controllers/bagController.js";
import { checkAvaliability, setCustomerID } from "../middlewares/validateBag.js";
import { validateToken } from "../middlewares/validateToken.js";
import { Router } from "express";

const bagRouter = Router()

bagRouter.post('/bag', createBag)
bagRouter.put('/bag', setCustomerID, checkAvaliability, setBag)
bagRouter.get('/bag', validateToken, getBag)

export default bagRouter 