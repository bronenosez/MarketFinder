function extractProductData(jsonData) {
  let product = {
    name: "Неизвестно",
    link: jsonData?.seo?.link[0].href,
    description: "Нет описания",
    price: 0,
    category: "Техника",
    options: [],
  };

  // Ищем название продукта
  const webHeadingPattern = /^webProductHeading-\d+-default-\d+$/;
  const webHeadingKey = Object.keys(jsonData.widgetStates).find((key) =>
    webHeadingPattern.test(key)
  );

  if (webHeadingKey) {
    const innerJsonString = jsonData.widgetStates[webHeadingKey];
    const innerData = JSON.parse(innerJsonString);
    product.name = innerData.title;
  }

  // Ищем цену продукта
  const keyPattern = /^webPrice-\d+-default-\d+$/;
  const targetKey = Object.keys(jsonData.widgetStates).find((key) =>
    keyPattern.test(key)
  );

  if (targetKey) {
    const innerJsonString = jsonData.widgetStates[targetKey];
    try {
      const innerData = JSON.parse(innerJsonString);
      const price = innerData.price.replace(/[^\d]/g, '')
      product.price = +price;
    } catch (error) {
      console.error("Ошибка парсинга JSON:", error);
    }
  }

  // Поиск описания товара
  if (jsonData.seo && jsonData.seo.script) {
    console.log(JSON.parse(jsonData.seo.script[0].innerHTML));
  }

  // // Ищем все виджеты с характеристиками
  // const wCharacteristicsPattern = /^webShortCharacteristics-\d+-default-\d+$/;
  // const characteristicKeys = Object.keys(jsonData.widgetStates).filter((key) =>
  //   wCharacteristicsPattern.test(key)
  // );

  // if (characteristicKeys.length) {
  //   characteristicKeys.forEach(key => {
  //     const innerJsonString = jsonData.widgetStates[key];
  //     try {
  //       const innerData = JSON.parse(innerJsonString);
  //       const characteristics = innerData.characteristics;
  //       if (Array.isArray(characteristics)) {
  //         characteristics.forEach(characteristic => {
  //           // Проверяем наличие заголовка и собираем его текст
  //           if (characteristic.title && characteristic.title.textRs) {
  //             const titleChar = characteristic.title.textRs
  //               .map(t => t.content)
  //               .join(" ");
  //             // Если у характеристики есть значения, объединяем их через запятую
  //             if (characteristic.values) {
  //               const valueChar = characteristic.values
  //                 .map(value => (value.text ? value.text : "Не указано"))
  //                 .join(", ");
  //               product.options.push({ [titleChar]: valueChar });
  //             }
  //           }
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Ошибка парсинга JSON (характеристики):", error);
  //     }
  //   });
  // }

  // // Ищем описание товара (например, в текстовом блоке)
  // const wDescriptionPattern = /^textBlock-\d+-default-\d+$/;
  // const descriptionKey = Object.keys(jsonData.widgetStates).find(key =>
  //   wDescriptionPattern.test(key)
  // );

  // if (descriptionKey) {
  //   const descJsonString = jsonData.widgetStates[descriptionKey];
  //   try {
  //     const descData = JSON.parse(descJsonString);
  //     if (descData && descData.text) {
  //       product.description = descData.text;
  //     }
  //   } catch (error) {
  //     console.error("Ошибка парсинга JSON (описание):", error);
  //   }
  // }


  return product;
}

export default extractProductData;
