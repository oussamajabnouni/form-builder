/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link } from "react-router-dom";
import { Button } from "../../components/lib";
import { QuestionViewer } from "../forms-list/form-row";

function PageRow({ page }) {
  const { title, description, id, form } = page;
  return (
    <div
      css={{
        padding: "1em",
        border: "1px solid #f1f1f4",
        borderRadius: "3px",
      }}
    >
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={`/form/${id}`}>
        <Button>Public Link</Button>
      </Link>
      {form?.questions?.map((item) => (
        <li key={item.id} aria-label={item.title}>
          <QuestionViewer item={item} />
        </li>
      ))}
    </div>
  );
}

export { PageRow };
