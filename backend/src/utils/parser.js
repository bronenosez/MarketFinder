import driverPool from "./driverPool.js";
import OzonParser from "./OzonParser.js";
import WildberriesParser from "./WildberriesParser.js";
import ApiError from "../utils/ApiError.js";

class Parser {
  constructor() {
    const data = driverPool.getDriver();

    this.driver = data.driver;
    this.userAgent = data.userAgent;
  }

  static getAvailableSites() {
    return ["ozon", "wildberries"];
  }

  getParser(site) {
    const parsers = {
      ozon: OzonParser,
      wildberries: WildberriesParser,
    };

    const ParserClass = parsers[site];
    if (!ParserClass) {
      throw ApiError.badRequest(`Неизвестный сайт: ${site}.`);
    }

    return new ParserClass(this.driver, this.userAgent);
  }
}

export default Parser;
