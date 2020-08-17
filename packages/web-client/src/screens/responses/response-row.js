/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Card } from "../../components/lib";

function ResponseRow({ response }) {
  const { page, responses } = response;

  return (
    <Card>
      <h1>{page?.title}</h1>
      <legend>{page?.description}</legend>
      <div css={{ display: "grid", gridTemplateColumns: "auto auto" }}>
        {responses?.map((item) => (
          <div key={item._id}>
            <div>{item.question}</div>
            <div>{item.response}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export { ResponseRow };
