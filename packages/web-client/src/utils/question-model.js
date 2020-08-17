export default class Question {
  static TYPES = Object.freeze({
    SINGLE: "Options: Pick One",
    MULTIPLE: "Options: Multi Pick",
    TEXT: "Short Answer",
  });

  static DEFAULTS = Object.freeze({
    text: "New Question",
    type: Question.TYPES.SINGLE,
    options: [],
  });

  constructor(params = {}) {
    const { text, type, options, id } = { ...Question.DEFAULTS, ...params };
    this.text = text;
    this.type = type;
    this.options = options;
    this.id = id || Math.random();
  }

  get hasOptions() {
    return (
      this.type === Question.TYPES.SINGLE ||
      this.type === Question.TYPES.MULTIPLE
    );
  }

  get inputType() {
    if (this.type === Question.TYPES.SINGLE) return "radio";
    if (this.type === Question.TYPES.MULTIPLE) return "checkbox";
    if (this.type === Question.TYPES.TEXT) return "text";
    throw new Error("This question does not have an input type.");
  }

  merge(patch) {
    return new Question({ ...this, ...patch });
  }
}
