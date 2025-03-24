import "dotenv/config";
import express from "express";
import userRouter from "./routes/userRoute.js";
import searchRouter from "./routes/searchRoute.js";
import errorHandler from "./middleware/errorHandler.js";
import driverPool from "./utils/Parser/driverPool.js";
import driverPool from "./utils/driverPool.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API for Market Finder",
    description: "Это REST API, разработанный для серверной части.",
    version: "1.0.0",
    contact: {
      name: "Timur",
      url: "https://t.me/whiiiiteduke",
    },
  },
  servers: [
    {
      url: "http://localhost:3001",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/**.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(express.json());

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/api/users/", userRouter);
app.use("/api/search/", searchRouter);

// Глобальная обработка ошибок
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}.`);
});

process.on("SIGINT", async () => {
  console.log("Выключение сервера...");
  await driverPool.closeAll();
  server.close(() => {
    console.log("Сервер остановлен.");
    process.exit(0);
  });
});
