/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  Input,
  Spinner,
  FormGroup,
  ErrorMessage,
  Button,
  Select,
} from "../../components/lib";
import { useCreatePage } from "../../hooks/pages-hook";
import { useForms } from "../../hooks/forms-hook";
import { useAsync } from "../../hooks/hooks";

function PageCreate() {
  const formItems = useForms();
  const [handleAddClick] = useCreatePage({ throwOnError: true });

  const { isLoading, isError, error, run, reset } = useAsync();

  function handleAddPage(event) {
    event.preventDefault();
    const { title, description, form } = event.target.elements;
    if (isError) {
      reset();
    } else {
      run(
        handleAddClick({
          title: title.value,
          description: description.value,
          form: form.value,
        })
      ).then(() => {
        title.value = "";
        description.value = "";
      });
    }
  }

  if (formItems.length === 0) {
    return (
      <div
        css={{
          padding: "1em",
          border: "1px solid #f1f1f4",
          borderRadius: "3px",
        }}
      >
        Please create a form first
      </div>
    );
  }

  return (
    <form
      onSubmit={handleAddPage}
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        padding: "1em",
        border: "1px solid #f1f1f4",
        borderRadius: "3px",
      }}
    >
      <FormGroup>
        <label htmlFor="title">Title</label>
        <Input id="title" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="description">Description</label>
        <Input id="description" />
      </FormGroup>
      <FormGroup>
        <label>Assigned form</label>
        <Select id="form">
          {formItems.map((form) => (
            <option key={form.id} value={form.id}>
              {form.title}
            </option>
          ))}
        </Select>
      </FormGroup>
      <div>
        <Button variant="primary">
          {isLoading ? <Spinner css={{ marginLeft: 5 }} /> : "Create New Page"}
        </Button>
      </div>
      {isError ? <ErrorMessage error={error} /> : null}
    </form>
  );
}

export { PageCreate };
