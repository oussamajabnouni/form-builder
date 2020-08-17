const express = require('express');
const responseController = require('../../controllers/responses.controller');

const router = express.Router();

router.route('/').post(responseController.createResponse).get(responseController.getResponses);

module.exports = router;
