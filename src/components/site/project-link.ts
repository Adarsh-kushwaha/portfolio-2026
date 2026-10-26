/**
 * Deep link for project case studies: `?project=<tower id>` opens the dialog.
 */
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function useProjectParam() {
  const [params, setParams] = useSearchParams();
  const projectId = params.get("project");

  const open = useCallback(
    (id: string) =>
      setParams(
        (p) => {
          p.set("project", id);
          return p;
        },
        { preventScrollReset: true },
      ),
    [setParams],
  );

  const close = useCallback(
    () =>
      setParams(
        (p) => {
          p.delete("project");
          return p;
        },
        { replace: true, preventScrollReset: true },
      ),
    [setParams],
  );

  return { projectId, open, close };
}
