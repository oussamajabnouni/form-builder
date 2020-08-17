/** @jsx jsx */
import { jsx } from "@emotion/core";
import Question from "../../utils/question-model";

function FormRow({ form }) {
  const { title, questions } = form;
  return (
    <div
      css={{
        padding: "1em",
        border: "1px solid #f1f1f4",
        borderRadius: "3px",
      }}
    >
      <h2>{title}</h2>
      {questions.map((item) => (
        <QuestionViewer item={item} />
      ))}
    </div>
  );
}

function QuestionViewer({ item }) {
  const question = new Question(item);
  return (
    <li key={question.id} aria-label={question.title} css={{ display: "grid" }}>
      <p>{question.text}</p>
      {question.options?.length !== 0 ? (
        question.options?.map((option, i) => (
          <label key={i}>
            <input
              type={question.inputType}
              id={option}
              name={option}
              value={option}
              disabled
            />
            {option}
          </label>
        ))
      ) : (
        <textarea disabled />
      )}
    </li>
  );
}

export { FormRow, QuestionViewer };
