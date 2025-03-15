import getEmbedding from "../utils/OpenAIE.js";
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

  cosineSimilarity(vec1, vec2) {
    const dotProduct = vec1.reduce((acc, val, i) => acc + val * vec2[i], 0);
    const magnitude1 = Math.sqrt(vec1.reduce((acc, val) => acc + val ** 2, 0));
    const magnitude2 = Math.sqrt(vec2.reduce((acc, val) => acc + val ** 2, 0));
    return dotProduct / (magnitude1 * magnitude2);
  }

  static async searchSimilarProducts(productName, excludedSite) {
    const parser = new Parser();
    const sites = Parser.getAvailableSites();
    const results = [];
    const sitesToSearch = sites.filter(site => site !== excludedSite);
    
    const productEmbedding = await getEmbedding(productName);


    for (const site of sitesToSearch) {
      try {
          const siteParser = parser.getParser(site); 
          const data = await siteParser.searchProducts(productName); 

          for (const product of data) {
            const productDescription = product.name;
            const productEmb = await getEmbedding(productDescription);

            const similarity = cosineSimilarity(productEmbedding, productEmb);

            if (similarity > 0.8) {
              results.push({site, product, similarity});
            }
          }
      } catch (error) {
          console.log(`Ошибка при поиске на ${site}: `, error.message);
      }
    }

    return results;
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
