const express = require('express');
const controller = require('../controllers/plantuml');
const router = express.Router();



router.get('/', controller.getPlantUmlPng);
router.get('/svg/:uml', controller.getPlantUmlSvg)

module.exports = router;   