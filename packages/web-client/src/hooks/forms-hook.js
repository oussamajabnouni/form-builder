import { useQuery, useMutation, queryCache } from "react-query";
import { useClient } from "context/auth-context";

function useForm(id, options) {
  const formsList = useForms(options);
  return formsList?.find((li) => li.id === id) ?? null;
}

function useForms({ onSuccess, ...options } = {}) {
  const client = useClient();
  const { data: formsList } = useQuery({
    queryKey: "forms",
    queryFn: () => client("forms").then((data) => data),
    onSuccess: async (formsList) => {
      await onSuccess?.(formsList);
    },
    ...options,
  });
  return formsList ?? [];
}

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === "function" ? recover() : null,
  onSettled: () => queryCache.invalidateQueries("forms"),
};

function useCreateForm(options) {
  const client = useClient();

  return useMutation((data) => client("forms", { data }), {
    ...defaultMutationOptions,
    ...options,
  });
}

export { useForm, useForms, useCreateForm };
