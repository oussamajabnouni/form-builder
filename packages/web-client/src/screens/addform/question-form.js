/** @jsx jsx */
import { jsx } from "@emotion/core";
import Question from "../../utils/question-model";
import ListController from "../../utils/list-controller";
import { InputOutlined, FormGroup, Select } from "../../components/lib";
import { Button } from "../../components/lib";
import { FiX, FiChevronUp, FiChevronDown } from "react-icons/fi";

function FormFieldEdit({ question, setQuestion }) {
  function handleChangeText(e) {
    setQuestion(question.merge({ text: e.target.value }));
  }

  function handleChangeType(e) {
    setQuestion(question.merge({ type: e.target.value }));
  }

  function setOptions(options) {
    setQuestion(question.merge({ options }));
  }

  const listController = new ListController(question.options, setOptions);

  return (
    <div>
      <FormGroup>
        <legend>Question Text</legend>
        <InputOutlined
          type="text"
          value={question.text}
          onChange={handleChangeText}
        />
      </FormGroup>
      <FormGroup>
        <legend>Question Type</legend>
        <Select
          id="question-type"
          value={question.type}
          onChange={handleChangeType}
        >
          {Object.values(Question.TYPES).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </FormGroup>

      {question.hasOptions && (
        <fieldset>
          <legend>Options</legend>

          {question.options.map((option, i) => (
            <div css={{ display: "flex" }} key={i}>
              <InputOutlined
                type="text"
                placeholder="Enter option"
                name={option}
                value={option}
                onChange={(e) => listController.set(i, e.target.value)}
              />
              <div css={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="secondary"
                  onClick={() => listController.moveUp(i)}
                >
                  <FiChevronUp />
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => listController.moveDown(i)}
                >
                  <FiChevronDown />
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => listController.remove(i)}
                >
                  <FiX />
                </Button>
              </div>
            </div>
          ))}
          <p>
            <Button onClick={() => listController.add("")}>
              <i className="fas fa-plus icon" />
              Add Option
            </Button>
          </p>
        </fieldset>
      )}
    </div>
  );
}

export default FormFieldEdit;
