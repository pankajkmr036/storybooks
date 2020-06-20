const path = require("path")
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");

const connectDB = require("./config/db");

//Load config
dotenv.config({ path: "./config/config.env" });

//Connect DB
connectDB();

const app = express();

//Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Handlebars
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs", layoutsDir:"./views/layout" }));
app.set("view engine", ".hbs");

//Static folder
app.use(express.static(path.join(__dirname, "public")))
//Routes
app.use("/", require("./routes/index"))

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
