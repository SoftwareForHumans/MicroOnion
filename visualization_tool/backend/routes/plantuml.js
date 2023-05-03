const express = require('express');
const controller = require('../controllers/plantuml');
const router = express.Router();



router.post('/png/:uml', controller.getPlantUmlPng);
router.post('/svg/:uml', controller.getPlantUmlSvg)

module.exports = router;   