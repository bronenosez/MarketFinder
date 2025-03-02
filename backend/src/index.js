import "dotenv/config";
import express from "express";
import userRouter from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/users/', userRouter);

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}.`);
});