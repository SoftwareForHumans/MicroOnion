const express = require('express');
const controller = require('../controllers/projects');

const router = express.Router();

router.post('/', controller.getProjects);
router.get('/refactoringsSequence/:name', controller.getRefactoringsSequence);
router.get('/:project/serviceDependencies/:service', controller.getServiceDependencies);
router.get('/:project/serviceExtraction/:service', controller.getServiceExtractionSequence);

module.exports = router;