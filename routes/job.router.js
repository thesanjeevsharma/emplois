const router = require('express').Router();
const JobController = require('../controllers/job.controller');
const jwt = require('../config/jwt.config');

router.post('/', jwt.authenticate, JobController.createJob);
router.get('/', JobController.getJobs);
router.post('/apply', jwt.authenticate, JobController.applyForJob);
router.post('/search', JobController.searchJob);
router.get('/:JobID', JobController.getJob);
router.get('/provider/:id', JobController.getJobByProvider);

module.exports = router;