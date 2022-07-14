const express = require("express");
const app = express();
const cors = require("cors");
const cache = require("./cache");
const connectDB = require("./config/db");
app.use(express.json());
app.use(cors());

// Declare a route
app.use("/conversionRate", require("./routes/currencyRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/favorites", require("./routes/favoritesRoutes"));

// Run the server!
const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    await app.listen(port);
    connectDB();
    await cache.cacheConnection(); // connect to redis server. make sure redis is running.
    console.log("app started on port", port);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
