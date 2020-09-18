require("dotenv").config();
const express = require("express");
require("express-async-errors");
const { connectDB } = require("./utils/db");
const errorHandler = require("./middleware/errorHandler");
const app = express();
app.use(express.json());
const routes = require("./routes");

app.use("/api", routes);

const PORT = process.env.PORT || 3000;

// app.use(errorHandler)
connectDB();
app.listen(PORT, () => {
  console.log(`I a-m Watiting for ${PORT}`);
});
