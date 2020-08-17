const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const responseSchema = mongoose.Schema(
  {
    page: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' },
    responses: [
      {
        question: {
          type: String,
          trim: true,
        },
        response: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
responseSchema.plugin(toJSON);
responseSchema.plugin(paginate);

/**
 * @typedef Response
 */
const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
