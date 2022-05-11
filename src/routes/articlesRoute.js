import { Router } from "express";

import { getArticles, setArticles } from "../controllers/articlesController.js";

const articleRouter = Router();

articleRouter.get('/articles', getArticles);
articleRouter.post('/articles', setArticles);

export default articleRouter;