import SearchController from "../controllers/searchController.js";

import { Router } from "express";

const searchRouter = Router();

searchRouter.post("/", SearchController.searchProducts);

export default searchRouter;
