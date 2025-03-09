import Parser from "../utils/parser.js";

class SearchService {
    static async searchProducts(productName) {
        const parser = new Parser();
        const data = await parser.searchProducts(productName);

        return data;
    }

    static async searchByLink(productUrl) {
        const parser = new Parser();
        const data = await parser.searchByLink(productUrl);

        return data;
    }
}

export default SearchService;