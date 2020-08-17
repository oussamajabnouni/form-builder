/** @jsx jsx */
import { jsx } from "@emotion/core";

import { useForms } from "hooks/forms-hook";
import { ListUL } from "../../components/lib";
import { FormHeader } from "./form-header";
import { FormRow } from "./form-row";
import { Profiler } from "../../components/profiler";

function FormsScreen() {
  const formItems = useForms();

  return (
    <Profiler id="{Forms List}">
      <div
        css={{
          listStyle: "none",
          display: "grid",
          gridGap: "1em",
        }}
      >
        <FormHeader />
        {formItems.length ? (
          <ListUL>
            {formItems.map((item) => (
              <li key={item.id} aria-label={item.title}>
                <FormRow form={item} />
              </li>
            ))}
          </ListUL>
        ) : (
          <div css={{ marginTop: "1em", fontSize: "1.2em" }}>
            You don't have any forms yet..
          </div>
        )}
      </div>
    </Profiler>
  );
}

export { FormsScreen };
