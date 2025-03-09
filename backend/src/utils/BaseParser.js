import driverPool from "./driverPool.js";

class BaseParser {
  constructor(driver) {
    this.driver = driver;
  }

  getRandomDelay(min = 5540, max = 7000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async searchProducts(productName) {}

  async searchByLink(productUrl) {}
}

export default BaseParser;
