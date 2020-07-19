const router = require('express').Router();
const jobs = require('../controllers/jobs');
const auth = require('../middleware/auth');

router.post('/create', auth.checkToken, async (req, res) => {
  const { status, data } = await jobs.createPost(req.body);
  res.status(status).send(data);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, data } = await jobs.getJobById(id);
  res.status(status).send(data);
});

router.get('/', async (req, res) => {
  const { status, data } = await jobs.getAllJobs();
  res.status(status).send(data);
});

router.post('/apply', async (req, res) => {
  const { status, data } = await jobs.addApplicant(req.body);
  res.status(status).send(data);
});

module.exports = router;
