const express = require('express');
const pageController = require('../../controllers/pages.controller');

const router = express.Router();

router.route('/').post(pageController.createPage).get(pageController.getPages);

router.route('/:pageId').get(pageController.getPage);

module.exports = router;
