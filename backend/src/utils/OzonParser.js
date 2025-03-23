import * as cheerio from "cheerio";
import BaseParser from "./BaseParser.js";
import tough from "tough-cookie";
import { until, By } from "selenium-webdriver";
import { wrapper } from "axios-cookiejar-support";
import axios from "axios";
import ApiError from "./ApiError.js";
import extractProductData from "./parserJeskiy.js";

class OzonParser extends BaseParser {
  async parseSeleniumCookies() {
    try {
      await this.driver.get("https://ozon.ru");

      await this.driver.wait(
        until.elementLocated(
          By.xpath('//input[@placeholder="Искать на Ozon"]'),
        ),
        10000,
      );

      const cookiesArray = await this.driver.manage().getCookies();

      return cookiesArray;
    } catch (error) {
      console.error("Ошибка при получении cookies:", error);
      return null;
    }
  }

  async parseJarCookies() {
    const cookieJar = new tough.CookieJar();
    const seleniumCookies = await this.parseSeleniumCookies();

    seleniumCookies.forEach((cookie) => {
      const cookieStr = `${cookie.name}=${cookie.value}; Domain=${cookie.domain}; Path=${cookie.path}`;

      cookieJar.setCookieSync(cookieStr, "https://www.ozon.ru");
    });

    return cookieJar;
  }

  async searchProducts(productName) {
    const jarCookie = await this.parseJarCookies();
    const client = wrapper(
      axios.create({ jar: jarCookie, withCredentials: true }),
    );

    try {
      let response = await client.get(
        `https://www.ozon.ru/api/entrypoint-api.bx/page/json/v2?url=/search/?from_global=true&layout_page_index=1&page=1&paginator_token=3618992&search_page_state=vz6tCVi-i0M4KJtcGIx7V8QPI3G0hIIGeom1_eyH-ZEoZr2A-u-i1sT-j483qpTRocwHhTWswGXiADSSAWlhmc_qeDTgNKYJxqx8zXPKPFZEDAz33ciIlD9HJnJW&text=${encodeURIComponent(
          productName,
        )}`,
        {
          headers: {
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
            priority: "u=0, i",
            "sec-ch-ua":
              '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": '"Android"',
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "service-worker-navigation-preload": "true",
            "upgrade-insecure-requests": "1",
            "user-agent": this.userAgent,
          },
        },
      );
      let widgetStatesKeys = Object.keys(response.data.widgetStates);
      const firstKey = widgetStatesKeys[0];
      const widgetStateString = response.data.widgetStates[firstKey];
      const widgetState = JSON.parse(widgetStateString);

      let items = [];

      for (let el of widgetState.items) {
        const productUrl = "https://www.ozon.ru" + el.action.link;
        const productDetails = await this.searchByLink(productUrl);
        items.push(productDetails);
      }

      return items;
    } catch (error) {
      throw error;
    }
  }

  async extractPath(url, basePath = "/product/") {
    const pattern = new RegExp(`(${basePath}[^?]+(\\?[^&]*)?)`);
    const match = url.match(pattern);
    return match ? match[0] : null;
  }

  async searchByLink(productUrl) {
    const jarCookie = await this.parseJarCookies();
    const client = wrapper(
      axios.create({ jar: jarCookie, withCredentials: true }),
    );

    productUrl = await this.extractPath(productUrl);
    console.log(productUrl);

    try {
      let response = await client.get(
        `https://www.ozon.ru/api/entrypoint-api.bx/page/json/v2?url=${productUrl}&layout_container=pdpPage2column&layout_page_index=2&sh=glqyQ3jYXg&start_page_id=41ece86cf6c92366964ae875c344d533`,
        {
          headers: {
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
            priority: "u=0, i",
            "sec-ch-ua":
              '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": '"Android"',
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "service-worker-navigation-preload": "true",
            "upgrade-insecure-requests": "1",
            "user-agent": this.userAgent,
          },
        },
      );

      let extractedProductData = extractProductData(response.data);
      let item = {};
      item.name = extractedProductData.name;
      item.link = extractedProductData.link;
      item.description = extractedProductData.formattedDescription;
      console.log(item);
      return item;
    } catch (error) {
      throw error;
    }
  }
}

export default OzonParser;
