function extractProductData(jsonData) {
  let product = {
    name: "Неизвестно",
    link: jsonData?.seo?.link[0].href,
    description: "Нет описания",
    category: "Техника",
    options: [],
  };

  // Ищем название продукта
  const keyPattern = /webMobAspects-\d+-pdpMobileThemePage\d+-\d+/;
  const targetKey = Object.keys(jsonData.widgetStates).find((key) =>
    keyPattern.test(key)
  );

  if (targetKey) {
    const innerJsonString = jsonData.widgetStates[targetKey];
    try {
      const innerData = JSON.parse(innerJsonString);
      console.log("Найденный объект:", JSON.stringify(innerData, null, 2));
    } catch (error) {
      console.error("Ошибка парсинга JSON:", error);
    }
  }

  // Ищем блок с характеристиками динамически среди всех widgetStates
  const widgetStates = jsonData?.widgetStates || {};
  const characteristicsBlock = Object.values(widgetStates).find(
    (block) =>
      typeof block === "string" &&
      (block.includes("fullCharacteristicsData") ||
        block.includes("limitedCharacteristicsData"))
  );

  if (characteristicsBlock) {
    // Преобразуем строку в объект, если требуется
    let charBlockObj;
    try {
      charBlockObj = JSON.parse(characteristicsBlock);
    } catch (err) {
      charBlockObj = null;
    }

    // Если не удалось спарсить, пробуем взять напрямую из widgetStates
    charBlockObj = charBlockObj || {};

    // Если в найденном блоке есть fullCharacteristicsData, используем его
    const fullChars = charBlockObj.fullCharacteristicsData || [];

    // Извлекаем остальные характеристики в options
    fullChars.forEach((category) => {
      category.characteristics.forEach((char) => {
        product.options.push({
          [char.title]:
            (char.contentRS &&
              char.contentRS[0] &&
              char.contentRS[0].content) ||
            "Не указано",
        });
      });
    });

    // Если есть описание в данном блоке (попробуем найти alt у картинки, например)
    if (charBlockObj.description) {
      product.description = charBlockObj.description;
    }
  }

  return product;
}

export default extractProductData;
