import BaseParser from "./BaseParser.js";
import fetch from "node-fetch";

class WildberriesParser extends BaseParser {
  async searchProducts(productName) {
    try {
      let response = await fetch(
        `https://search.wb.ru/exactmatch/ru/common/v9/search?ab_testing=false&appType=1&curr=rub&dest=123589415&lang=ru&page=1&query=${productName}&resultset=catalog&sort=popular&spp=30&suppressSpellcheck=false`
      );
      let data = await response.json();
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
    } catch (error) {
      console.error("Ошибка:", error);
      return [];
    }
  }

  async searchByLink(productUrl) {
    try {
      return item;
    } catch (error) {
      console.error("Ошибка:", error);
      return [];
    }
  }
}

export default WildberriesParser;
