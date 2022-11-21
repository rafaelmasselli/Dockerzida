import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import routerUser from "./routes/user";
import routerAuth from "./routes/auth";
import routerTransactions from "./routes/transactions";

import swaggerUI from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

app.use("/documentation", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/user", routerUser);
app.use("/auth", routerAuth);
app.use("/transaction", routerTransactions);

app.listen(3333, () => {
  console.log(`server running ☕
http://localhost:3333
  `);
});
