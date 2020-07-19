const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(logger());

app.use('/api', require('./api'));

app.get('/', (req, res) => res.json({
  message: 'Hello World!!!',
}));

app.post('/', auth.checkToken, (req, res) => res.json({
  message: 'Posting!',
}));

app.listen(8080);
