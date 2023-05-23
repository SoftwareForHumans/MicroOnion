const express = require('express');
const controller = require('../controllers/projects');

const router = express.Router();

router.get('/', controller.getProjects);
router.get('/refactoringsSequence/:name', controller.getRefactoringsSequence);
router.get('/:project/serviceDependencies/:service', controller.getServiceDependencies);
router.get('/:project/serviceExtraction/:service', controller.getServiceExtractionSequence);
router.get('/:project/getInitialState/:service', controller.getInitialState);
router.get('/:project/getFinalState/:service', controller.getFinalState);
module.exports = router;