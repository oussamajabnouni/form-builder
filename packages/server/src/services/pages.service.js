const { Page } = require('../models');

/**
 * Create a page
 * @param {Object} pageBody
 * @returns {Promise<Page>}
 */
const createPage = async (pageBody) => {
  const page = await Page.create(pageBody);
  return page;
};

/**
 * Query for pages
 * @returns {Promise<QueryResult>}
 */
const queryPages = async () => {
  const pages = await Page.find().populate({ path: 'form', select: 'questions' });
  return pages;
};

module.exports = {
  createPage,
  queryPages,
};
