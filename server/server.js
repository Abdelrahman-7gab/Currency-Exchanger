const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const Redis = require("redis");
const redisClient = Redis.createClient();
const Expiration = 3600; // 1 hour
require("dotenv").config();

app.use(cors());

// Declare a route
app.get("/conversionRate/:fromCurrency/:toCurrency", async (request, reply) => {
  const fromCurrency = request.params.fromCurrency;
  const toCurrency = request.params.toCurrency;

  try {
    const rate = await getOrSetCache(
      "conversionRate/" + fromCurrency + "/" + toCurrency,
      async () => {
        const response = await axios.get(
          `https://api.apilayer.com/fixer/convert?to=${toCurrency}&from=${fromCurrency}&amount=1`,
          {
            headers: {
              apiKey: process.env.FIXER_API_TOKEN,
            },
          }
        );
        return response.data;
      }
    );

    return reply.send(rate);
  } catch (err) {
    console.log(err);
  }
});

//function that checks if the data exists in redis Cache
const getOrSetCache = async (key, cb) => {
  return new Promise(async (resolve, reject) => {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      console.log("cache hit", key);
      return resolve(JSON.parse(cachedData));
    } else {
      try {
        const newData = await cb();
        redisClient.setEx(key, Expiration, JSON.stringify(newData));

        console.log("added to cache");
        resolve(newData);
      } catch (err) {
        reject(err);
      }
    }
  });
};

// Run the server!
const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    await app.listen(port);
    await redisClient.connect();
    console.log("app started on port", port);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
