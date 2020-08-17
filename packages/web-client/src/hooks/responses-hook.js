import React from "react";
import { useQuery, queryCache, useMutation } from "react-query";
import { useClient } from "context/auth-context";
import responsePlaceholderSvg from "assets/placeholder.svg";

const loadingResponse = {
  title: "Loading...",
  description: "loading...",
  placeholder: responsePlaceholderSvg,
  loadingResponse: true,
};

const loadingResponses = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-response-${index}`,
  ...loadingResponse,
}));

const responseQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

const getResponseSearchConfig = (client, query) => ({
  queryKey: ["responseSearch", { query }],
  queryFn: () => client(`responses?${query}`).then((data) => data),
  config: {
    onSuccess(responses) {
      for (const response of responses) {
        queryCache.setQueryData(
          ["response", { responseId: response.id }],
          response,
          responseQueryConfig
        );
      }
    },
  },
});

function useResponseSearch(query) {
  const client = useClient();
  const result = useQuery(getResponseSearchConfig(client, query));
  return { ...result, responses: result.data ?? loadingResponses };
}

function useResponse(responseId) {
  const client = useClient();
  const { data } = useQuery({
    queryKey: ["response", { responseId }],
    queryFn: () =>
      client(`responses/${responseId}`).then((data) => data.response),
    ...responseQueryConfig,
  });
  return data ?? loadingResponse;
}

function useRefetchResponseSearchQuery() {
  const client = useClient();
  return React.useCallback(
    async function refetchResponseSearchQuery() {
      queryCache.removeQueries("responseSearch");
      await queryCache.prefetchQuery(getResponseSearchConfig(client, ""));
    },
    [client]
  );
}

function setQueryDataForResponse(response) {
  queryCache.setQueryData({
    queryKey: ["response", { responseId: response.id }],
    queryFn: response,
    ...responseQueryConfig,
  });
}

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === "function" ? recover() : null,
  onSettled: () => queryCache.invalidateQueries("responses"),
};

function useCreateResponse(options) {
  const client = useClient();

  return useMutation((data) => client("responses", { data }), {
    ...defaultMutationOptions,
    ...options,
  });
}

export {
  useResponse,
  useResponseSearch,
  useRefetchResponseSearchQuery,
  setQueryDataForResponse,
  useCreateResponse,
};
