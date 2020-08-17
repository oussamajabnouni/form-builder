const httpStatus = require('http-status');
const { Form } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a form
 * @param {Object} formBody
 * @returns {Promise<Form>}
 */
const createForm = async (formBody) => {
  const form = await Form.create(formBody);
  return form;
};

/**
 * Query for forms
 * @returns {Promise<QueryResult>}
 */
const queryForms = async () => {
  const forms = await Form.find({});
  return forms;
};

/**
 * Get form by id
 * @param {ObjectId} id
 * @returns {Promise<Form>}
 */
const getFormById = async (id) => {
  return Form.findById(id);
};

/**
 * Update form by id
 * @param {ObjectId} formId
 * @param {Object} updateBody
 * @returns {Promise<Form>}
 */
const updateFormById = async (formId, updateBody) => {
  const form = await getFormById(formId);
  if (!form) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Form not found');
  }
  Object.assign(form, updateBody);
  await form.save();
  return form;
};

module.exports = {
  createForm,
  queryForms,
  getFormById,
  updateFormById,
};
