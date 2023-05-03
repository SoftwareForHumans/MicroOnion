const express = require('express');
const controller = require('../controllers/projects');

const router = express.Router();

router.post('/', controller.getProjects);

module.exports = router;