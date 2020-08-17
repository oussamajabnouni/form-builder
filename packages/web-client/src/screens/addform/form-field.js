/** @jsx jsx */
import { jsx } from "@emotion/core";

import React, { useState } from "react";
import QuestionForm from "./question-form";
import {
  FiEdit,
  FiChevronUp,
  FiChevronDown,
  FiTrash2,
  FiSave,
} from "react-icons/fi";
import { Button, CircleButton } from "../../components/lib";

function FormField({
  question,
  setQuestion,
  removeQuestion,
  moveQuestionUp,
  moveQuestionDown,
}) {
  const [editing, setEditing] = useState(true);

  function toggleEditing() {
    setEditing(!editing);
  }

  return (
    <li
      css={{
        margintop: "1em",
        padding: "1em 1.5em",
        border: "1px solid #f1f1f4",
        borderRadius: "3px",
        display: "grid",
        gridTemplateColumns: "3fr 1fr",
      }}
    >
      <div>
        {editing ? (
          <QuestionForm question={question} setQuestion={setQuestion} />
        ) : (
          <div css={{ display: "grid" }}>
            <p>{question.text}</p>
            {question.hasOptions ? (
              question.options.map((option, i) => (
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
          </div>
        )}

        <Button
          variant="secondary"
          css={{ marginLeft: "10px" }}
          onClick={toggleEditing}
        >
          {editing ? (
            <React.Fragment>
              <FiSave />
              Save Question
            </React.Fragment>
          ) : (
            <React.Fragment>
              <FiEdit />
              Edit Field
            </React.Fragment>
          )}
        </Button>
        <Button
          variant="secondary"
          css={{ marginLeft: "10px" }}
          onClick={removeQuestion}
        >
          <FiTrash2 />
          Delete Field
        </Button>
      </div>
      <div>
        <CircleButton
          variant="secondary"
          css={{ marginLeft: "10px" }}
          onClick={moveQuestionUp}
        >
          <FiChevronUp />
        </CircleButton>
        <CircleButton
          variant="secondary"
          css={{ marginLeft: "10px" }}
          onClick={moveQuestionDown}
        >
          <FiChevronDown />
        </CircleButton>
      </div>
    </li>
  );
}

export default FormField;
