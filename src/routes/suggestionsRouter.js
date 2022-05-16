import { Router } from "express";

import { getSuggestions, setSuggestions } from "../controllers/suggestionsController.js";

const suggestionsRouter = Router();

suggestionsRouter.get('/suggestions', getSuggestions);
suggestionsRouter.post('/suggestions', setSuggestions);

export default suggestionsRouter;
