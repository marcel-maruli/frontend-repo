import { config } from "dotenv";
config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoute from "./routes/User";
import authRoute from "./routes/Auth";
import cookieParser from "cookie-parser";

const app = express();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(cookieParser());

app.use(bodyParser.json());
app.use("/", authRoute);
app.use("/users", userRoute);

app.listen(port, () => {
  console.log(`Server active @port ${port}`);
});
