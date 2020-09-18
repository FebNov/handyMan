require("dotenv").config();
const express = require("express");
const { connectDB } = require("./utils/db");
const app = express();
app.use(express.json());
const routes = require("./routes");

app.use("/api", routes);

const PORT = process.env.PORT || 3000;
connectDB();
app.listen(PORT, () => {
  console.log(`I a-m Watiting for ${PORT}`);
});
