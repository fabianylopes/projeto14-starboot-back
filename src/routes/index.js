import { Router } from "express";

import authRouter from "./authRoute.js";
import articleRouter from "./articlesRoute.js";
import bagRouter from "./bagRoute.js";
import coffeesRouter from "./coffeesRouter.js";
import suggestionsRouter from "./suggestionsRouter.js";

const router = Router();

router.use(authRouter);
router.use(bagRouter)
router.use(articleRouter);
router.use(coffeesRouter);
router.use(suggestionsRouter);

export default router;