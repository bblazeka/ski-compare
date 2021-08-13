import React from "react";

type SkiContextProps = {
  skiResorts: SkiResort[];
  activeSkiResort: number;
  setActiveSkiResort: Function;
};

export const SkiContext = React.createContext<SkiContextProps>({
  skiResorts: [],
  activeSkiResort: 0,
  setActiveSkiResort: (index: number) => {
    console.log(index);
  },
});