import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";

// .env path configration
dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 8000;
const db_url = process.env.DATABASE_URL + process.env.DATABASE_NAME;

// database connection
mongoose.connect(db_url);

// cors middleware
app.use(cors());
app.use(express.static("public"));

// middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// routes

app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log("server is running on port " + port);
});
