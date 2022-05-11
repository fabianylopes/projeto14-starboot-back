import { Router } from "express";

import { validateSignInSchema, validateSignUpSchema } from "../middlewares/validateAuthSchema.js";
import { setSignIn, setSignUp } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post('/sign-up', validateSignUpSchema, setSignUp);
authRouter.post('/sign-in', validateSignInSchema, setSignIn);

export default authRouter;
