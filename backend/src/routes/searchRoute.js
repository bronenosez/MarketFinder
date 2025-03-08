import SearchController from '../controllers/searchController.js';

import { Router } from 'express';


const searchRouter = Router();

searchRouter.post('/:productName', SearchController.searchProducts);


export default searchRouter;