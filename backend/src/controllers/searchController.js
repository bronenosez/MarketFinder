import ApiError from "../utils/ApiError.js";
import SearchService from "../services/searchService.js";

class SearchController {
    static async searchProducts(request, response, next) {
        try {
            const productName = request.params.productName;

            if (!productName || productName.trim() === '') {
                return next(ApiError.badRequest('productName is missing or empty.'));
            }

            const products = await SearchService.searchProducts(productName);
            

            response.json({message: "Product found", products});
        } catch (error) {
            next(error);
        }
    }
}

export default SearchController;