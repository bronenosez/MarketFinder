import ApiError from "../utils/ApiError.js";
import SearchService from "../services/searchService.js";

class SearchController {
    static async searchProducts(request, response, next) {
        try {
            const { productName, productLink } = request.query;

            if (!productName && !productLink) {
                return next(ApiError.badRequest('productName or productLink is missing or empty.'));
            }

            let products;
            if (productName) {
                products = await SearchService.searchProducts(productName);
            } else if (productLink) {
                products = await SearchService.searchByLink(productLink);
            }
            
            
            response.json({message: "Product found", products});
        } catch (error) {
            next(error);
        }
    }
}

export default SearchController;