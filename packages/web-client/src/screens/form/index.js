/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useParams } from "react-router-dom";
import { usePage } from "../../hooks/pages-hook";
import { useNavigate } from "react-router-dom";
import { useCreateResponse } from "../../hooks/responses-hook";
import { useAsync } from "../../hooks/hooks";
import {
  Spinner,
  ErrorMessage,
  Button,
  WrapperCenter,
  Card,
} from "../../components/lib";
import { Question } from "./question";

function FormScreen() {
  const { id } = useParams();
  const page = usePage(id);
  const navigate = useNavigate();
  const [handleAddClick] = useCreateResponse({ throwOnError: true });

  const { isLoading, isError, error, run, reset } = useAsync();

  function handleAddPage(event) {
    event.preventDefault();
    let responses = [];
    for (let index = 0; index < event.target.elements.length; index++) {
      const element = event.target.elements[index];
      if (element.type === "text") {
        responses = [
          ...responses,
          { question: element.name, response: element.id },
        ];
      }
      if (element.type === "radio" && element.checked === true) {
        responses = [
          ...responses,
          { question: element.name, response: element.id },
        ];
      }
      if (element.type === "checkbox" && element.checked === true) {
        let exist = false;
        for (let index = 0; index < responses.length; index++) {
          if (responses[index].question === element.name) {
            responses[index].response =
              responses[index].response + " - " + element.id;
            exist = true;
          }
        }
        if (!exist) {
          responses = [
            ...responses,
            { question: element.name, response: element.id },
          ];
        }
      }
    }
    const postData = {
      page: id,
      responses,
    };
    if (isError) {
      reset();
    } else {
      run(handleAddClick(postData)).then(() => {
        navigate("/responses");
      });
    }
  }

  if (!page)
    return (
      <WrapperCenter>No Form found, please use a valid url.</WrapperCenter>
    );

  return (
    <WrapperCenter>
      <Card>
        <h1>{page.title}</h1>
        <legend>{page.description}</legend>
      </Card>
      <form
        onSubmit={handleAddPage}
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        {page.form.questions.map((question) => (
          <Question question={question} key={question.id} />
        ))}
        <Button variant="primary">
          {isLoading ? <Spinner css={{ marginLeft: 5 }} /> : "Send"}
        </Button>
        {isError ? <ErrorMessage error={error} /> : null}
      </form>
    </WrapperCenter>
  );
}

export { FormScreen };
