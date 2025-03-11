import driverPool from "./driverPool.js";
import OzonParser from "./OzonParser.js";
import WildberriesParser from "./WildberriesParser.js";

class Parser {
  constructor() {
    const data = driverPool.getDriver();

    this.driver = data.driver;
    this.userAgent = data.userAgent;
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

    return new ParserClass(this.driver, this.userAgent);
  }
}

export default Parser;
