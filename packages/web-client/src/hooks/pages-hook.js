import { useQuery, useMutation, queryCache } from "react-query";
import { useClient } from "context/auth-context";

function usePage(id, options) {
  const pagesList = usePages(options);
  return pagesList?.find((li) => li.id === id) ?? null;
}

function usePages({ onSuccess, ...options } = {}) {
  const client = useClient();

  const { data: pagesList } = useQuery({
    queryKey: "pages",
    queryFn: () => client("pages").then((data) => data),
    onSuccess: async (pagesList) => {
      await onSuccess?.(pagesList);
    },
    ...options,
  });
  return pagesList ?? [];
}

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === "function" ? recover() : null,
  onSettled: () => queryCache.invalidateQueries("pages"),
};

function useCreatePage(options) {
  const client = useClient();

  return useMutation((data) => client("pages", { data }), {
    ...defaultMutationOptions,
    ...options,
  });
}

export { usePage, usePages, useCreatePage };
