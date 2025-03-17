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
        results.push({ site, data });
      } catch (error) {
        console.log(`Ошибка парсинга для ${site}: `, error.message);
        throw error;
      }
    }

    return results;
  }

  static async searchSimilarProducts(product, excludedSite) {
    const parser = new Parser();
    const sites = Parser.getAvailableSites();
    const sitesToSearch = sites.filter((site) => site !== excludedSite);

    let products = [];
    for (const site of sitesToSearch) {
      try {
        const siteParser = parser.getParser(site);
        const data = await siteParser.searchProducts(product.name);

        console.log(data);
        for (const productData of data) {
          products.push({
            name: productData.name,
            description: productData.description,
            link: productData.link,
          });
        }
      } catch (error) {
        console.log(`Ошибка при поиске на ${site}: `, error.message);
      }
    }

    let result = await findMostSimilarProduct(product.description, products);
    return result;
  }

  static async searchByLink(productUrl) {
    const marketplaceRegex = /https?:\/\/(?:www\.)?([^\/\.]+)\./;
    const matchMarketplace = productUrl.match(marketplaceRegex);

    if (matchMarketplace) {
      const site = matchMarketplace[1];
      const parser = new Parser().getParser(site);
      const productData = await parser.searchByLink(productUrl);

      
      return productData;
      // TODO:  Расскоменить код когд будет готов парсер.
      // const similarProducts = await this.searchSimilarProducts(
      //   productData,
      //   site
      // );
      // return {
      //   originalProduct: productData,
      //   comparisons: similarProducts,
      // };
    }
  }
}

export default SearchService;
