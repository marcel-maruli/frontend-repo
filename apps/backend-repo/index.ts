import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import userRoute from "./routes/User";
import authRoute from "./routes/Auth";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

const port = process.env.API_BASE_PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use("/", authRoute);
app.use("/users", userRoute);

app.listen(port, () => {
  console.log(`Server active @port ${port}`);
});
