import SearchController from "../controllers/searchController.js";

import { Router } from "express";

const searchRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Операции с поиском
 */

/**
 * @swagger
 * /api/search/:
 *   post:
 *     summary: Поиск товаров
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: productName
 *         schema:
 *           type: string
 *         required: false
 *         description: Название товара для поиска
 *       - in: query
 *         name: productLink
 *         schema:
 *           type: string
 *         required: false
 *         description: Ссылка на товар для поиска
 *     responses:
 *       200:
 *         description: Результаты поиска
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   description: Результат поиска по названию
 *                   properties:
 *                     site:
 *                       type: string
 *                       description: Название сайта-источника
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: Название товара
 *                           description:
 *                             type: string
 *                             description: Описание товара
 *                           link:
 *                             type: string
 *                             description: Ссылка на товар
 *                 - type: object
 *                   description: Результат поиска по ссылке с сравнением
 *                   properties:
 *                     originalProduct:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           description: Название оригинального товара
 *                         description:
 *                           type: string
 *                           description: Описание оригинального товара
 *                         link:
 *                           type: string
 *                           description: Ссылка на оригинальный товар
 *                     comparisons:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: Название похожего товара
 *                           description:
 *                             type: string
 *                             description: Описание похожего товара
 *                           link:
 *                             type: string
 *                             description: Ссылка на похожий товар
 *             examples:
 *               searchByName:
 *                 summary: Пример ответа при поиске по названию
 *                 value:
 *                   site: "exampleSite"
 *                   data:
 *                     - name: "Ноутбук Dell Inspiron"
 *                       description: "Надёжный ноутбук для работы и игр"
 *                       link: "https://example.com/dell-inspiron"
 *               searchByLink:
 *                 summary: Пример ответа при поиске по ссылке
 *                 value:
 *                   originalProduct:
 *                     name: "Ноутбук HP Pavilion"
 *                     description: "Мощный ноутбук для бизнеса"
 *                     link: "https://example.com/hp-pavilion"
 *                   comparisons:
 *                     - name: "Ноутбук HP Envy"
 *                       description: "Стильный и производительный ноутбук"
 *                       link: "https://example.com/hp-envy"
 *       400:
 *         description: Некорректный запрос
 *       500:
 *         description: Внутренняя ошибка сервера
 */

searchRouter.post("/", SearchController.searchProducts);

export default searchRouter;
