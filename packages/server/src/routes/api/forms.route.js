const express = require('express');
const formController = require('../../controllers/forms.controller');

const router = express.Router();

router.route('/').post(formController.createForm).get(formController.getForms);

router.route('/:formId').get(formController.getForm);

module.exports = router;
