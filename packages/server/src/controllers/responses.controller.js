const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { responseService } = require('../services');

const createResponse = catchAsync(async (req, res) => {
  const response = await responseService.createResponse(req.body);
  res.status(httpStatus.CREATED).send(response);
});

const getResponses = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['page']);
  const result = await responseService.queryResponses(filter);
  res.send(result);
});

module.exports = {
  createResponse,
  getResponses,
};
