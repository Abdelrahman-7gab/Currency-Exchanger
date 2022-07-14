const express = require("express");
const app = express();
const cors = require("cors");
const cache = require("./cache");

app.use(cors());

// Declare a route
app.use("/conversionRate", require("./routes/currencyRoutes"));

// Run the server!
const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    await app.listen(port);
    await cache.cacheConnection();
    console.log("app started on port", port);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
