const cache = require("../cache");
const axios = require("axios");

//@Desc get conversation rate for specific two currencies for the last month
//@Route GET /conversionRate/:fromCurrency/:toCurrency
//@Access Public

const getConversionRate = async (request, reply) => {
  const fromCurrency = request.params.fromCurrency;
  const toCurrency = request.params.toCurrency;

  const today = new Date().toLocaleDateString("fr-ca");
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  const lastMonth = date.toLocaleDateString("fr-ca");

  try {
    const rate = await cache.getOrSetCache(
      `conversionRate/${fromCurrency}/${toCurrency}/${lastMonth}/${today}`,
      async () => {
        const response = await axios.get(
          `https://api.apilayer.com/fixer/timeseries?start_date=${lastMonth}&end_date=${today}&symbols=${toCurrency}&base=${fromCurrency}`,
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
};

module.exports = { getConversionRate };
