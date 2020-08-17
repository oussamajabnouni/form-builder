const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { formService } = require('../services');

const createForm = catchAsync(async (req, res) => {
  const form = await formService.createForm(req.body);
  res.status(httpStatus.CREATED).send(form);
});

const getForms = catchAsync(async (req, res) => {
  const result = await formService.queryForms();
  res.send(result);
});

const getForm = catchAsync(async (req, res) => {
  const form = await formService.getFormById(req.params.formId);
  if (!form) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Form not found');
  }
  res.send(form);
});

const updateForm = catchAsync(async (req, res) => {
  const form = await formService.updateFormById(req.params.formId, req.body);
  res.send(form);
});

module.exports = {
  createForm,
  getForms,
  getForm,
  updateForm,
};
