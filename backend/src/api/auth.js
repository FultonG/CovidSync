const router = require('express').Router();
const user = require('../controllers/user');

router.post('/create', async (req, res) => {
  const { status, data } = await user.createUser(req.body);
  res.status(status).send(data);
});

router.post('/login', async (req, res) => {
  const { status, data } = await user.authenticateUser(req.body);
  res.status(status).send(data);
});

module.exports = router;
