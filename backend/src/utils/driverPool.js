import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chromeDriverPath = path.join(__dirname, "undetected_chromedriver.exe");

class DriverPool {
  constructor(poolSize = 3) {
    this.poolSize = poolSize;
    this.drivers = [];
    this.index = 0;

    for (let i = 0; i < poolSize; i++) {
      this.drivers.push(this.createDriver());
    }
  }

  createDriver() {
    const chromeOptions = new chrome.Options();
    // chromeOptions.addArguments("--headless=new");
    chromeOptions.addArguments("--enable-javascript");
    chromeOptions.addArguments("--disable-blink-features=AutomationControlled");
    chromeOptions.add_argument("--ignore-certificate-errors");
    chromeOptions.add_argument("--ignore-ssl-errors");
    chromeOptions.excludeSwitches(["enable-automation"]);
    chromeOptions.addArguments(
      "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.124 Safari/537.36"
    );

    return new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .setChromeService(new chrome.ServiceBuilder(chromeDriverPath))
      .build();
  }

  getDriver() {
    const driver = this.drivers[this.index];
    this.index = (this.index + 1) % this.poolSize;
    return driver;
  }

  async closeAll() {
    for (const driver of this.drivers) {
      await driver.quit();
    }
  }
}

const driverPool = new DriverPool(3);
export default driverPool;
