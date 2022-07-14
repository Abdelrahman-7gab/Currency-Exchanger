const Redis = require("redis");
const redisClient = Redis.createClient();
const Expiration = 3600; // 1 hour
require("dotenv").config();

//function that checks if the data exists in redis Cache and if it doesn't adds it to cahce
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

const cacheConnection = async () => {
  try {
    await redisClient.connect();
    console.log("redis connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { getOrSetCache, cacheConnection };
