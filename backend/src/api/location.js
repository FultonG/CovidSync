const router = require('express').Router();
const axios = require('axios');

const baseRequest = 'https://www.mapquestapi.com/geocoding/v1/address/';

router.get('/zipcode/:zip', async (req, res) => {
  try {
    const { zip } = req.params;
    const { data: { results } } = await axios.get(baseRequest, {
      params: {
        key: process.env.LOCATION_API_KEY,
        inFormat: 'kvp',
        outFormat: 'json',
        location: zip + ', US',
        thumbMaps: false,
      },
    });
    console.log(results);
    return res.json({
      data: results,
    });
  } catch (err) {
    return res.json({ message: err });
  }
});

module.exports = router;
