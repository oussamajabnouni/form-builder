/** @jsx jsx */
import { jsx } from "@emotion/core";

import { usePages } from "hooks/pages-hook";
import { ListUL } from "../../components/lib";
import { PageHeader } from "./page-header";
import { PageCreate } from "./page-create";
import { PageRow } from "./page-row";
import { Profiler } from "../../components/profiler";

function PagesScreen() {
  const pageItems = usePages();

  return (
    <Profiler id="{Pages List}">
      <div
        css={{
          listStyle: "none",
          display: "grid",
          gridGap: "1em",
        }}
      >
        <PageHeader />
        <PageCreate />
        {pageItems.length ? (
          <ListUL>
            {pageItems.map((item) => (
              <li key={item.id} aria-label={item.title}>
                <PageRow page={item} />
              </li>
            ))}
          </ListUL>
        ) : (
          <div css={{ marginTop: "1em", fontSize: "1.2em" }}>
            You don't have any pages yet..
          </div>
        )}
      </div>
    </Profiler>
  );
}

export { PagesScreen };
