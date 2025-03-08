import Parser from "../utils/parser.js";

class SearchService {
    static async searchProducts(productName) {
        const parser = new Parser();
        const data = await parser.searchProducts(productName);
        await parser.close();

        return data;
    }

    static async searchByLink(productUrl) {
        const parser = new Parser();
        const data = await parser.searchByLink(productUrl);
        await parser.close();

        return data;
    }
}

export default SearchService;