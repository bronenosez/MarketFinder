import ApiError from "./ApiError.js";
import BaseParser from "./BaseParser.js";
import fetch from "node-fetch";

class WildberriesParser extends BaseParser {
  async searchProducts(productName) {
    try {
      let response = await fetch(
        `https://search.wb.ru/exactmatch/ru/common/v9/search?ab_testing=false&appType=1&curr=rub&dest=123589415&lang=ru&page=1&query=${productName}&resultset=catalog&sort=popular&spp=30&suppressSpellcheck=false`
      );
      let data = await response.json();

      if (data.data.total !== 0) {
        let products = [];

        for (let i = 0; i < data.data.products.length; i++) {
          let item = {};
          let part_number = data.data.products[i].id;
  
          item.name = data.data.products[i].name;
          item.price = data.data.products[i].sizes[0].price.total / 100;
          item.link = `https://www.wildberries.ru/catalog/${part_number}/detail.aspx`;
  
          products.push(item);
        }
  
        return products;
      } else {
        throw ApiError.badRequest("Товар не найден.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      throw error;
    }
  }

  async searchByLink(productUrl) {
    try {
      const parts = productUrl.split("/");
      const article = parts[4];

      let url = `https://card.wb.ru/cards/v1/detail?appType=1&curr=rub&dest=-1257786&spp=0&nm=${article}`;
      let response = await fetch(url);
      let data = await response.json(url);

      if (data.data.products.length !== 0) {
        let item = {};
        item.name = data.data.products[0].name;
        item.price = data.data.products[0].salePriceU / 100 || data.data.products[0].price / 100;
        item.link = productUrl;
  
        return item;
      } else {
        throw ApiError.badRequest("Товар не найден.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      throw error;
    }
  }
}

export default WildberriesParser;
