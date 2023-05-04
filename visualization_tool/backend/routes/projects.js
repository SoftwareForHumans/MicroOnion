const express = require('express');
const controller = require('../controllers/projects');

const router = express.Router();

router.post('/', controller.getProjects);
router.get('/:name', controller.getProject)

module.exports = router;