const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const formSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    questions: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
formSchema.plugin(toJSON);
formSchema.plugin(paginate);

/**
 * @typedef Form
 */
const Form = mongoose.model('Form', formSchema);

module.exports = Form;
