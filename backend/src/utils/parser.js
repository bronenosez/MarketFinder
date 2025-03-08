import { Builder } from "selenium-webdriver";
import chrome from 'selenium-webdriver/chrome.js';
import * as cheerio from 'cheerio';
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
console.log(__dirname);
const chromeDriverPath = path.join(__dirname, 'undetected_chromedriver.exe');


class Parser {
    constructor() {
        const chromeOptions = new chrome.Options();
        chromeOptions.addArguments('--headless=new');
        chromeOptions.addArguments('--enable-javascript');
        chromeOptions.addArguments("--disable-blink-features=AutomationControlled");
        chromeOptions.excludeSwitches(['enable-automation']);

        chromeOptions.addArguments('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.124 Safari/537.36');

        this.driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .setChromeService(new chrome.ServiceBuilder(chromeDriverPath))
            .build();
    }

    getRandomDelay(min = 5540, max = 7000) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async searchProducts(productName) {
        try {
            await this.driver.get(`https://www.ozon.ru/search/?text=${encodeURIComponent(productName)}`);
            
            await this.driver.executeScript("Object.defineProperty(navigator, 'webdriver', {get: () => undefined});");
    
            await this.driver.sleep(this.getRandomDelay());
    
            const pageSource = await this.driver.getPageSource();
            
            const $ = cheerio.load(pageSource);
            
            const items = [];
    
            
            $('div.tile-root').each((i, el) => {
              const name = $(el).find('span.tsBody500Medium').text().trim();
              const link = $(el).find('a.tile-clickable-element').attr('href');
              const price = $(el).find('span.tsHeadline500Medium').text().trim();
              let item = {name, price, link:'https://www.ozon.ru'+link};
              
              items.push(item);
            });

            console.log('Найденные товары:', items);
            
            return items;
        } catch (error) {
            console.error('Ошибка:', error);
            return [];
        } 
    }

    async searchByLink(productUrl) {
        try {
            await this.driver.get(productUrl);

            await this.driver.executeScript("Object.defineProperty(navigator, 'webdriver', {get: () => undefined});");
    
            await this.driver.sleep(this.getRandomDelay());

            const pageSource = await this.driver.getPageSource();
            
            const $ = cheerio.load(pageSource);
            
            let item = {};
            
            item.name = $('[data-widget="webProductHeading"]').find('h1.tsHeadline550Medium').text().trim();
            item.priceWithOzonCard = $('[data-widget="webPrice"]').find('span:contains("c Ozon Картой")').parent().children().first().find('span').first().text().trim();
            item.priceWithoutOzonCard = $('[data-widget="webPrice"]').find('span:contains("без Ozon Карты")').parent().parent().first().find('span').first().text().trim();
            
            console.log('Товар: ', item);

            return item;
        } catch (error) {
            console.error('Ошибка:', error);
            return [];
        }
    }

    async close() {
        this.driver.quit();
    }
}


export default Parser;