import "dotenv/config";
import express from "express";
import userRouter from "./routes/userRoute.js";
import searchRouter from "./routes/searchRoute.js";
import errorHandler from "./middleware/errorHandler.js";
import driverPool from "./utils/Parser/driverPool.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

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
