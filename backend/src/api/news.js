const router = require('express').Router();
const axios = require('axios');

const baseRequest = 'http://newsapi.org/v2/top-headlines';

// More info on response schemas: https://newsapi.org/s/us-science-news-api

router.get('/', async (req, res) => {
  try {
    const { data } = await axios.get(baseRequest, {
      params: {
        q: 'coronavirus',
        country: 'United States',
        category: 'science',
        apiKey: process.env.NEWS_API_KEY,
      },
    });
    return res.json(data);
  } catch (err) {
    return res.json({ message: err });
  }
});

module.exports = router;
