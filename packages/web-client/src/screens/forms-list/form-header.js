/** @jsx jsx */
import { jsx } from "@emotion/core";

import { Link } from "react-router-dom";
import { Button } from "../../components/lib";

function FormHeader() {
  return (
    <div
      css={{
        padding: "1em",
        border: "1px solid #f1f1f4",
        borderRadius: "3px",
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
      }}
    >
      <h1>Forms</h1>
      <Link to={`/addform`}>
        <Button variant="primary">Create New Form</Button>
      </Link>
    </div>
  );
}

export { FormHeader };
