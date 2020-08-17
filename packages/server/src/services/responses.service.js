const { Response } = require('../models');
const mongoose = require('mongoose');

/**
 * Create a response
 * @param {Object} responseBody
 * @returns {Promise<Response>}
 */
const createResponse = async (responseBody) => {
  const response = await Response.create(responseBody);
  return response;
};

/**
 * Query for responses
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per response (default = 10)
 * @param {number} [options.response] - Current response (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryResponses = async (filter) => {
  let responses;
  if (mongoose.Types.ObjectId.isValid(filter.page)) responses = await Response.find(filter).populate({ path: 'page' });
  else responses = await Response.find().populate({ path: 'page' });
  return responses;
};

module.exports = {
  createResponse,
  queryResponses,
};
