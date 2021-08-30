import React from "react";

type SkiContextProps = {
  skiResorts: SkiResort[];
  visibleSkiResorts: SkiResort[];
  activeSkiResort: number;
  setActiveSkiResort: Function;
  setVisibleSkiResorts: Function;
};

export const SkiContext = React.createContext<SkiContextProps>({
  skiResorts: [],
  visibleSkiResorts: [],
  activeSkiResort: 0,
  setActiveSkiResort: (_: number) => {},
  setVisibleSkiResorts: (_: any) => {},
});
