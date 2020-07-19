const express = require('express');
const authRoute = require('./auth.js');
const jobAPI = require('./jobs.js');
const covidAPI = require('./covid');
const newsAPI = require('./news');
const faq = require('./faq');

const router = express.Router();

router.use('/covid', covidAPI);
router.use('/news', newsAPI);
router.use('/auth', authRoute);
router.use('/jobs', jobAPI);
router.use('/faq', faq);

module.exports = router;
