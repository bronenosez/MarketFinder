import * as cheerio from "cheerio";
import driverPool from "./driverPool.js";
import OzonParser from "./OzonParser.js";
import WildberriesParser from "./WildberriesParser.js";

class Parser {
  constructor() {
    this.driver = driverPool.getDriver();
  }

  getParser(site) {
    const parsers = {
      ozon: OzonParser,
      wildberries: WildberriesParser,
    };

    const ParserClass = parsers[site];
    if (!ParserClass) {
      throw new Error(`Неизвестный сайт: ${site}.`);
    }

    return new ParserClass(this.driver);
  }
}

export default Parser;
