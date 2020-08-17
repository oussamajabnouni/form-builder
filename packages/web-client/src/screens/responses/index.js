/** @jsx jsx */
import { jsx } from "@emotion/core";

import React from "react";
import * as colors from "styles/colors";
import {
  useResponseSearch,
  useRefetchResponseSearchQuery,
} from "hooks/responses-hook";
import { usePages } from "hooks/pages-hook";
import { ResponseRow } from "./response-row";
import { ListUL, Spinner, Select } from "components/lib";
import { Profiler } from "components/profiler";

function ResponsesScreen() {
  const [query, setQuery] = React.useState("");
  const [queried, setQueried] = React.useState();
  const pageItems = usePages();
  const { responses, error, isLoading, isError, isSuccess } = useResponseSearch(
    query
  );
  const refetchResponseSearchQuery = useRefetchResponseSearchQuery();

  React.useEffect(() => {
    return () => refetchResponseSearchQuery();
  }, [refetchResponseSearchQuery]);

  function handleSearchChange(event) {
    event.preventDefault();
    setQueried(true);
    setQuery(`page=${event.target.value}`);
  }

  return (
    <div>
      <div>
        <Select id="page" onChange={handleSearchChange}>
          {[{ title: "All" }, ...pageItems].map((page) => (
            <option key={page.id} value={page.id}>
              {page.title}
            </option>
          ))}
        </Select>

        {isError ? (
          <div css={{ color: colors.danger }}>
            <p>There was an error:</p>
            <pre>{error.message}</pre>
          </div>
        ) : null}
      </div>
      <div>
        {queried ? null : (
          <div css={{ marginTop: 20, fontSize: "1.2em", textAlign: "center" }}>
            {isLoading ? (
              <div css={{ width: "100%", margin: "auto" }}>
                <Spinner />
              </div>
            ) : isSuccess && !responses.length ? (
              <p>No one submitted a form.</p>
            ) : null}
          </div>
        )}
        {responses.length ? (
          <Profiler
            id="Discover Responses Screen Response List"
            metadata={{ query, responseCount: responses.length }}
          >
            <ListUL css={{ marginTop: 20 }}>
              {responses.map((response) => (
                <li key={response.id} aria-label={response.title}>
                  <ResponseRow key={response.id} response={response} />
                </li>
              ))}
            </ListUL>
          </Profiler>
        ) : queried ? (
          <div css={{ marginTop: 20, fontSize: "1.2em", textAlign: "center" }}>
            {isLoading ? (
              <div css={{ width: "100%", margin: "auto" }}>
                <Spinner />
              </div>
            ) : (
              <p>
                Hmmm... I couldn't find any responses with the query "{query}."
                Please try another.
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export { ResponsesScreen };
