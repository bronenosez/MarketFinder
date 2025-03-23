import ApiError from "./ApiError.js";
import BaseParser from "./BaseParser.js";
import fetch from "node-fetch";

class WildberriesParser extends BaseParser {
  getBasketAndVolByProductId(productId) {
    let basketId;
    const s = ~~(productId / 1e5);
    switch (!0) {
      case s >= 0 && s <= 143:
        basketId = "01";
        break;
      case s <= 287:
        basketId = "02";
        break;
      case s <= 431:
        basketId = "03";
        break;
      case s <= 719:
        basketId = "04";
        break;
      case s <= 1007:
        basketId = "05";
        break;
      case s <= 1061:
        basketId = "06";
        break;
      case s <= 1115:
        basketId = "07";
        break;
      case s <= 1169:
        basketId = "08";
        break;
      case s <= 1313:
        basketId = "09";
        break;
      case s <= 1601:
        basketId = "10";
        break;
      case s <= 1655:
        basketId = "11";
        break;
      case s <= 1919:
        basketId = "12";
        break;
      case s <= 2045:
        basketId = "13";
        break;
      case s <= 2189:
        basketId = "14";
        break;
      case s <= 2405:
        basketId = "15";
        break;
      case s <= 2621:
        basketId = "16";
        break;
      case s <= 2837:
        basketId = "17";
        break;
      case s <= 3053:
        basketId = "18";
        break;
      case s <= 3269:
        basketId = "19";
        break;
      case s <= 3485:
        basketId = "20";
        break;
      case s <= 3701:
        basketId = "21";
        break;
      case s <= 3917:
        basketId = "22";
        break;
      default:
        basketId = "23";
    }

    return { basketId, vol: s };
  }

  async searchProducts(productName) {
    try {
      let response = await fetch(
        `https://search.wb.ru/exactmatch/ru/common/v9/search?ab_testing=false&appType=1&curr=rub&dest=123589415&lang=ru&page=1&query=${productName}&resultset=catalog&sort=popular&spp=30&suppressSpellcheck=false`
      );
      let data = await response.json();

      if (data.data.total !== 0) {
        let products = [];

        for (let i = 0; i < data.data.products.length; i++) {
          let part_number = data.data.products[i].id;

          let productLink = `https://www.wildberries.ru/catalog/${part_number}/detail.aspx`;
          let productDetails = await this.searchByLink(productLink);
          products.push(productDetails);
        }

        return products;
      } else {
        throw ApiError.badRequest("Товар не найден.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      throw error;
    }
  }

  async getProductFeature(productId) {
    const { basketId, vol } = this.getBasketAndVolByProductId(productId);
    const part = ~~(productId / 1000);
    let url = `https://basket-${basketId}.wbbasket.ru/vol${vol}/part${part}/${productId}/info/ru/card.json`;
    let response = await fetch(url);
    let data = await response.json(url);

    let ProductFeatures = {};
    const dataOptions = Object.entries(data.options);

    ProductFeatures.imt_name = data.imt_name;
    ProductFeatures.subj_name = data.subj_name;
    ProductFeatures.description = data.description;
    ProductFeatures.options = [];
    dataOptions.forEach(([key, value]) => {
      ProductFeatures.options.push({ name: value.name, value: value.value });
    });
    ProductFeatures.brand = data.selling.brand_name;

    return ProductFeatures;
  }

  async formatProductData(data) {
    const optionsText = data.options
      .map((option) => `${option.name}: ${option.value}`)
      .join(", ");

    return (
      `Название: ${data.imt_name}\n` +
      `Описание: ${data.description}\n` +
      `Категория: ${data.subj_name}\n` +
      `Бренд: ${data.brand}\n` +
      `Опции: ${optionsText}`
    );
  }

  async searchByLink(productUrl) {
    try {
      const parts = productUrl.split("/");
      const article = parts[4];

      let url = `https://card.wb.ru/cards/v1/detail?appType=1&curr=rub&dest=-1257786&spp=0&nm=${article}`;
      let response = await fetch(url);
      let data = await response.json(url);
      let productFeaturesData = await this.getProductFeature(article);
      let formattedProductFeatures = await this.formatProductData(
        productFeaturesData
      );

      if (data.data.products.length !== 0) {
        let item = {};
        item.name = data.data.products[0].name;
        item.price =
          data.data.products[0].salePriceU / 100 ||
          data.data.products[0].price / 100;
        item.link = productUrl;
        item.description = formattedProductFeatures;

        return item;
      } else {
        throw ApiError.badRequest("Товар не найден.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      throw error;
    }
  }
}

export default WildberriesParser;
