import React from "react";

type SkiContextProps = {
  skiResorts: SkiResort[];
  visibleSkiResorts: SkiResort[];
  activeSkiResort: number;
  setActiveSkiResort: Function;
  setVisibleSkiResorts: any;
};

export const SkiContext = React.createContext<SkiContextProps>({
  skiResorts: [],
  visibleSkiResorts: [],
  activeSkiResort: 0,
  setActiveSkiResort: (index: number) => {
    console.log(index);
  },
  setVisibleSkiResorts: (i: any) => {
    console.log(i);
  },
});
