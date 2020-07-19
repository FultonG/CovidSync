const router = require('express').Router();
const axios = require('axios');

const baseRequest = 'https://covid-api.com/api';
const v2BaseRequest = 'https://covidtracking.com/api/v1';

// More info on response schemas: https://covid-api.com/api/

router.get('/regions', async (req, res) => {
  try {
    const { data } = await axios.get(`${baseRequest}/regions`);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

router.get('/total', async (req, res) => {
  try {
    const { data } = await axios.get(`${baseRequest}/reports/total`);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

router.get('/reports/:iso', async (req, res) => {
  try {
    const { iso } = req.params;
    const { data } = await axios.get(`${baseRequest}/reports?iso=${iso}`);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

router.get('/usa-daily', async (req, res) => {
  try {
    const { data } = await axios.get(`${v2BaseRequest}/us/daily.json`);
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

router.get('/state-info', async (req, res) => {
  try {
    const { data } = await axios.get(`${v2BaseRequest}/states/info.json`);
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

module.exports = router;
