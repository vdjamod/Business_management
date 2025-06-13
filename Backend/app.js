import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectRedis } from "./utils/redisClient.js";

import ownerRouter from "./routes/owner.js";
import employeeRouter from "./routes/employee.js";
import productRouter from "./routes/product.js";
import businessRouter from "./routes/business.js";
import inventoryRouter from "./routes/inventory.js";
import saleRouter from "./routes/sale.js";
import employeeDashRouter from "./routes/employeeDash.js";

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_API);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Redis connection
connectRedis();

// Express
const app = express();
let port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));

//                    ------------- Router ---------------

app.use("/owner", ownerRouter);
app.use("/employee", employeeDashRouter);
app.use("/owner/business", businessRouter);
app.use("/owner/business/:bid/manage/product", productRouter);
app.use("/owner/business/:bid/manage/inventory", inventoryRouter);
app.use("/owner/business/:bid/manage/sale", saleRouter);
app.use("/owner/business/:bid/manage/employee", employeeRouter);

app.get("/signout", async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
  });

  res.send("Cookie removed successfully");
});

app.listen(port, () => {
  console.log(`server is on port ${port}`);
});
