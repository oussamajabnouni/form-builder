const express = require('express');
const pagesRoute = require('./pages.route');
const formsRoute = require('./forms.route');
const responsesRoute = require('./responses.route');
const docsRoute = require('./docs.route');

const router = express.Router();

router.use('/pages', pagesRoute);
router.use('/forms', formsRoute);
router.use('/responses', responsesRoute);
router.use('/docs', docsRoute);

module.exports = router;
