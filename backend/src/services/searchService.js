import Parser from "../utils/parser.js";

class SearchService {
  static async searchProducts(productName) {
    const site = "ozon";
    const parser = new Parser().getParser(site);
    const data = await parser.searchProducts(productName);

    return data;
  }

  static async searchByLink(productUrl) {
    const marketplaceRegex = /https?:\/\/(?:www\.)?([^\/\.]+)\./;
    const matchMarketplace = productUrl.match(marketplaceRegex);
    
    if (matchMarketplace) {
      const site = matchMarketplace[1];
      const parser = new Parser().getParser(site);
      const data = await parser.searchByLink(productUrl);
  
      return data;
    }
  }
}

export default SearchService;
