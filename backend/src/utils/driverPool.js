import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import path from "path";
import { fileURLToPath } from "url";
import UserAgent from "user-agents";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chromeDriverPath = path.join(__dirname, "undetected_chromedriver.exe");

class DriverPool {
  constructor(poolSize = 3) {
    this.poolSize = poolSize;
    this.drivers = [];
    this.userAgents = [];
    this.index = 0;

    for (let i = 0; i < poolSize; i++) {
      const userAgent = new UserAgent({ platform: "Win32" }).toString();
      this.userAgents.push(userAgent);
      this.drivers.push(this.createDriver(userAgent));
    }
  }

  createDriver(userAgent) {
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments("--headless=new");
    chromeOptions.addArguments("--enable-javascript");
    chromeOptions.addArguments("--disable-blink-features=AutomationControlled");
    chromeOptions.addArguments("--ignore-certificate-errors");
    chromeOptions.addArguments("--ignore-ssl-errors");
    chromeOptions.excludeSwitches(["enable-automation"]);
    chromeOptions.addArguments(`user-agent=${userAgent}`);

    return new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .setChromeService(new chrome.ServiceBuilder(chromeDriverPath))
      .build();
  }

  getDriver() {
    const driver = this.drivers[this.index];
    const userAgent = this.userAgents[this.index];
    this.index = (this.index + 1) % this.poolSize;
    return { driver, userAgent };
  }

  async closeAll() {
    for (const driver of this.drivers) {
      await driver.quit();
    }
  }
}

const driverPool = new DriverPool(3);
export default driverPool;
