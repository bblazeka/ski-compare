type Category = {
  readonly key: string;
  readonly name: string;
  readonly color: string;
};

type Slopes = {
  readonly easy: number;
  readonly medium: number;
  readonly hard: number;
  readonly total: number;
  readonly rating: number;
  readonly ratingsCount: string;
  readonly lifts: any[];
  readonly snow: string;
  readonly liftStatus: string;
  readonly bottomElevation: number;
  readonly topElevation: number;
  readonly logoPath: string;
};

type SkiResort = {
  readonly key: string;
  readonly name: string;
  readonly lat: number;
  readonly long: number;
  readonly slopes: Slopes;
  readonly weather: any;
  readonly distance: number;
  selected: boolean;
};

type PieData = {
  readonly id: string;
  readonly name: string;
  readonly value: number;
  readonly catName?: string;
};
