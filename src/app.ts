import express from "express";
import dotenv from "dotenv";
import router from "./routes/studentRoutes";
import connectDB from "./config/connectDB";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
