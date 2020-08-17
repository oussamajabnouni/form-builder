const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { pageService } = require('../services');

const createPage = catchAsync(async (req, res) => {
  const page = await pageService.createPage(req.body);
  res.status(httpStatus.CREATED).send(page);
});

const getPages = catchAsync(async (req, res) => {
  const result = await pageService.queryPages();
  res.send(result);
});

const getPage = catchAsync(async (req, res) => {
  const page = await pageService.getPageById(req.params.pageId);
  if (!page) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Page not found');
  }
  res.send(page);
});

module.exports = {
  createPage,
  getPages,
  getPage,
};
