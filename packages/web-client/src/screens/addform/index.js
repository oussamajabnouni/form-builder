/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormTitle from "./form-title";
import FormField from "./form-field";
import { Button } from "../../components/lib";
import { useAsync, useInputValue } from "../../hooks/hooks";
import { useCreateForm } from "../../hooks/forms-hook";
import Question from "../../utils/question-model";
import ListController from "../../utils/list-controller";

function EditFormScreen() {
  const navigate = useNavigate();
  const [title, handleChangeTitle] = useInputValue("New Form");
  const [questions, setQuestions] = useState([]);
  const listController = new ListController(questions, setQuestions);

  const [handleAddClick] = useCreateForm({ throwOnError: true });

  const { isLoading, isError, error, run, reset } = useAsync();

  function handleAddForm(event) {
    event.preventDefault();
    if (isError) {
      reset();
    } else {
      run(
        handleAddClick({
          title,
          questions,
        })
      ).then(() => {
        navigate("/forms");
      });
    }
  }

  return (
    <div css={{ display: "grid", gridGap: "1rem" }}>
      <FormTitle
        title={title}
        handleChangeTitle={handleChangeTitle}
        handleAddForm={handleAddForm}
        isLoading={isLoading}
      />
      {error ? <div>{JSON.stringify(error)}</div> : null}
      <ol css={{ padding: 0, display: "grid", gridGap: "1rem" }}>
        {questions.map((question, i) => (
          <FormField
            key={question.id}
            question={question}
            setQuestion={(question) => listController.set(i, question)}
            removeQuestion={() => listController.remove(i)}
            moveQuestionUp={() => listController.moveUp(i)}
            moveQuestionDown={() => listController.moveDown(i)}
          />
        ))}
      </ol>
      <Button onClick={() => listController.add(new Question())}>
        <i className="fas fa-plus icon" />
        Add Question
      </Button>
    </div>
  );
}

export { EditFormScreen };
