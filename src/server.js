import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 8080;

// Config body parser (chuyển dữ liệu qua JSON trước khi gọi route)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config view engine
configViewEngine(app);

// Init web routes
initWebRoutes(app);

app.listen(PORT, () => {
  console.log("JWT is running on port", PORT);
});
