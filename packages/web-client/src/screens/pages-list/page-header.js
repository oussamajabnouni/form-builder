/** @jsx jsx */
import { jsx } from "@emotion/core";

function PageHeader() {
  return (
    <div
      css={{
        padding: "1em",
        border: "1px solid #f1f1f4",
        borderRadius: "3px",
      }}
    >
      <h1>Pages</h1>
    </div>
  );
}

export { PageHeader };
