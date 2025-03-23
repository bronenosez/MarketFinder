function extractProductData(jsonData) {
  const data = {};

  if (jsonData.seo && typeof jsonData.seo.title === "string") {
    let titleProduct = jsonData.seo.title;
    titleProduct = titleProduct.split("купить")[0].trim();
    data.name = titleProduct; // Название товара
  } else {
    data.name = "Название не найдено";
  }

  if (
    jsonData.seo &&
    Array.isArray(jsonData.seo.link) &&
    jsonData.seo.link[0] &&
    jsonData.seo.link[0].href
  ) {
    data.link = jsonData.seo.link[0].href;
  } else {
    data.link = "Ссылка не найдена";
  }

  const regexpWebCharacteristics = /^webCharacteristics-\d+-.*-\d+$/;

  const targetWebCharacteristics = Object.keys(jsonData.widgetStates).find(
    (key) => regexpWebCharacteristics.test(key)
  );

  const webDescriptionsKeys = Object.keys(jsonData.widgetStates).filter((key) =>
    /^webDescription-\d+-.*-\d+$/.test(key)
  );

  let textDescription = ""; // Храним описание
  let foundRichAnnotation = false;
  let foundRichAnnotationJson = false;

  for (const key of webDescriptionsKeys) {
    try {
      const parsed = JSON.parse(jsonData.widgetStates[key]);

      if (parsed.richAnnotation) {
        textDescription += parsed.richAnnotation + "\n\n"; // Добавляем с отступом
        foundRichAnnotation = true;
      }

      if (parsed.richAnnotationJson && parsed.richAnnotationJson.content) {
        parsed.richAnnotationJson.content.forEach((block) => {
          block.blocks.forEach((item) => {
            if (item.text && item.text.content) {
              textDescription += item.text.content.join(" ") + "\n\n"; // Объединяем текстовые блоки
            }
          });
        });
        foundRichAnnotationJson = true;
      }

      if (foundRichAnnotation && foundRichAnnotationJson) break;
    } catch (error) {
      console.error("Ошибка парсинга описания:", key, error);
    }
  }

  if (!textDescription.trim()) {
    textDescription = "Описание отсутствует";
  }

  data.description = textDescription.trim();

  if (targetWebCharacteristics) {
    const innerJsonString = jsonData.widgetStates[targetWebCharacteristics];

    const result = {};
    try {
      const innerData = JSON.parse(innerJsonString);
      if (
        innerData.characteristics &&
        Array.isArray(innerData.characteristics)
      ) {
        innerData.characteristics.forEach((charBlock) => {
          if (charBlock.short && Array.isArray(charBlock.short)) {
            charBlock.short.forEach((item) => {
              const key = item.name.trim();
              const value = item.values.map((v) => v.text).join(", ");
              result[key] = value;
            });
          }
        });
      }
      data.options = result;
    } catch (error) {
      console.error("❌ Ошибка при парсинге характеристик:", error);
    }
  } else {
    data.options = {};
  }

  data.formattedDescription = formatProductCharacteristics(data);

  return data;
}

function formatProductCharacteristics(data) {
  const optionsText = data.options
    ? Object.entries(data.options)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ")
    : "Опции не заданы";

  return (
    `Название: ${data.name}\n` +
    `Описание: ${data.description}\n` +
    `Опции: ${optionsText}`
  );
}

export default extractProductData;
