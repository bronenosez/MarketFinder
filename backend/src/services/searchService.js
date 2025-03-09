import Parser from "../utils/parser.js";

class SearchService {
  static async searchProducts(productName) {
    const site = "wildberries";
    const parser = new Parser().getParser(site);
    const data = await parser.searchProducts(productName);

    return data;
  }

  static async searchByLink(productUrl) {
    const site = "ozon";
    const parser = new Parser().getParser(site);
    const data = await parser.searchByLink(productUrl);

    return data;
  }
}

export default SearchService;
