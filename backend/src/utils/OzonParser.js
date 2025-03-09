import * as cheerio from "cheerio";
import BaseParser from "./BaseParser.js";

class OzonParser extends BaseParser {
  async searchProducts(productName) {
    try {
      await this.driver.get(
        `https://www.ozon.ru/search/?text=${encodeURIComponent(productName)}`
      );

      await this.driver.executeScript(
        "Object.defineProperty(navigator, 'webdriver', {get: () => undefined});"
      );

      await this.driver.sleep(this.getRandomDelay());

      const pageSource = await this.driver.getPageSource();
      const $ = cheerio.load(pageSource);

      const items = [];
      $("div.tile-root").each((i, el) => {
        const name = $(el).find("span.tsBody500Medium").text().trim();
        const link = $(el).find("a.tile-clickable-element").attr("href");
        const price = $(el).find("span.tsHeadline500Medium").text().trim();
        let item = { name, price, link: "https://www.ozon.ru" + link };

        items.push(item);
      });

      return items;
    } catch (error) {
      console.error("Ошибка:", error);
      return [];
    }
  }

  async searchByLink(productUrl) {
    try {
      await this.driver.get(productUrl);

      await this.driver.executeScript(
        "Object.defineProperty(navigator, 'webdriver', {get: () => undefined});"
      );

      await this.driver.sleep(this.getRandomDelay());

      const pageSource = await this.driver.getPageSource();

      const $ = cheerio.load(pageSource);

      let item = {};

      item.name = $('[data-widget="webProductHeading"]')
        .find("h1.tsHeadline550Medium")
        .text()
        .trim();
      item.priceWithOzonCard = $('[data-widget="webPrice"]')
        .find('span:contains("c Ozon Картой")')
        .parent()
        .children()
        .first()
        .find("span")
        .first()
        .text()
        .trim();
      item.priceWithoutOzonCard = $('[data-widget="webPrice"]')
        .find('span:contains("без Ozon Карты")')
        .parent()
        .parent()
        .first()
        .find("span")
        .first()
        .text()
        .trim();

      return item;
    } catch (error) {
      console.error("Ошибка:", error);
      return [];
    }
  }
}

export default OzonParser;
