const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const pageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    form: { type: mongoose.Schema.Types.ObjectId, ref: 'Form' },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
pageSchema.plugin(toJSON);
pageSchema.plugin(paginate);

/**
 * @typedef Page
 */
const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
