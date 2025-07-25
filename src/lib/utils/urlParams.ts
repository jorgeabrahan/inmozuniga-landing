import type { TypeUrlParam } from "@lib/types/Application";

export const manageUrlParam = (
  key: string,
  value: string,
  operation: "set" | "delete",
) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  if (operation === "set") {
    urlSearchParams.set(key, value);
  } else if (operation === "delete") {
    urlSearchParams.delete(key);
  }
  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}?${urlSearchParams.toString()}`,
  );
};

export const manageUrlParams = (params: TypeUrlParam[]) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  params.map(({ key, value, operation }) => {
    if (operation === "set" && value) {
      urlSearchParams.set(key, value);
    } else if (operation === "delete") {
      urlSearchParams.delete(key);
    }
  });
  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}?${urlSearchParams.toString()}`,
  );
};
