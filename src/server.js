import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from "body-parser";
import connection from "./config/conectdb";
import initApiRoutes from "./routes/api";
import { configCors } from "./config/cors";

const app = express();
const PORT = process.env.PORT || 9090;

//configCors
configCors(app);

// Config body parser (chuyển dữ liệu qua JSON trước khi gọi route)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config view engine
configViewEngine(app);

// test connection
// connection();
// Init web routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
  console.log("JWT is running on port", PORT);
});
