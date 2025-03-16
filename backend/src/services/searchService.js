import findMostSimilarProduct from "../utils/MatchFinder.js";
import Parser from "../utils/parser.js";

class SearchService {
  static async searchProducts(productName) {
    const parser = new Parser();
    const sites = Parser.getAvailableSites();
    const results = [];

    for (const site of sites) {
      try {
        const siteParser = parser.getParser(site);
        const data = await siteParser.searchProducts(productName);
        results.push({site, data});
      } catch (error) {
        console.log(`Ошибка парсинга для ${site}: `, error.message);
        throw error;
      }
    }
    
    return results;
  }

  static async searchSimilarProducts(productName, excludedSite) {
    const parser = new Parser();
    const sites = Parser.getAvailableSites();
    const sitesToSearch = sites.filter(site => site !== excludedSite);
    
    
    let products = [];
    for (const site of sitesToSearch) {
      try {
          const siteParser = parser.getParser(site); 
          const data = await siteParser.searchProducts(productName); 

          for (const productData of data) {
            products.push({ 
              name: productData.name, 
              description: productData.name,
              link: productData.link
            });
          }
          
      } catch (error) {
          console.log(`Ошибка при поиске на ${site}: `, error.message);
      }
    }

    let result = await findMostSimilarProduct(productName, products);
    return result;
  }

  static async searchByLink(productUrl) {
    const marketplaceRegex = /https?:\/\/(?:www\.)?([^\/\.]+)\./;
    const matchMarketplace = productUrl.match(marketplaceRegex);
    
    if (matchMarketplace) {
      const site = matchMarketplace[1];
      const parser = new Parser().getParser(site);
      const productData = await parser.searchByLink(productUrl);
      
      const similarProducts = await this.searchSimilarProducts(productData.name, site);
      return {
          originalProduct: productData,
          comparisons: similarProducts,
      };
    }
  }
}

export default SearchService;
