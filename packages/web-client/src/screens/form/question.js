/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Card, Input } from "../../components/lib";
import QuestionModel from "../../utils/question-model";

function Question({ question }) {
  const _question = new QuestionModel(question);
  return (
    <Card>
      <p>{_question.text}</p>
      {_question.hasOptions ? (
        <li css={{ display: "grid" }}>
          {_question.options.map((option, i) => (
            <label key={i}>
              <input
                type={_question.inputType}
                id={option}
                name={_question.text}
                css={{ margin: "10px" }}
              />
              {option}
            </label>
          ))}
        </li>
      ) : (
        <Input name={_question.text} />
      )}
    </Card>
  );
}

export { Question };
