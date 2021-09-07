type Category = {
  readonly key: string;
  readonly name: string;
  readonly color: string;
};

type Slopes = {
  readonly easy: number;
  readonly medium: number;
  readonly hard: number;
  readonly rating: number;
  readonly count: string;
  readonly lifts: any[];
  readonly snow: string;
  readonly liftStatus: string;
};

type SkiResort = {
  readonly key: string;
  readonly name: string;
  readonly lat: number;
  readonly long: number;
  readonly slopes: Slopes;
  readonly weather: any;
  selected: boolean;
};

type PieData = {
  readonly id: string;
  readonly name: string;
  readonly value: number;
  readonly catName?: string;
};
