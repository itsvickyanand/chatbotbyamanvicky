import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors"

// .env path configration
dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 8000;
const db_url = process.env.DATABASE_URL + process.env.DATABASE_NAME;

// database connection
mongoose.connect(db_url);

// cors middleware
app.use(cors())

// middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(port, ()=>{
    console.log("server is running on port "+ port)
})