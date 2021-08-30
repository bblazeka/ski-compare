import { useContext, useMemo } from "react";
import { SkiContext } from "context/SkiContext";

export function useCurrentSkiResort(): SkiResort {
  const { visibleSkiResorts: skiResorts, activeSkiResort } =
    useContext(SkiContext);
  const currentSkiResort = useMemo(
    () => skiResorts.filter((s) => s.selected)[activeSkiResort],
    [skiResorts, activeSkiResort]
  );
  return currentSkiResort;
}
