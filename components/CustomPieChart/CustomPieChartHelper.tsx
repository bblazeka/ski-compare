import { CATEGORIES, COLORS } from "config/preferences";

export function mapToPieData(distribution: any[]): TPieData[] {
  return distribution.map((el) => {
    return {
      ...el,
      catName:
        el.catName !== undefined
          ? el.catName
          : CATEGORIES.find(
              (cat: TCategory) => cat.key?.toLowerCase() === el.name
            )?.name,
      id: el.name,
    };
  });
}

export function getColor(entry: any, index: number) {
  return (
    CATEGORIES.find((cat: TCategory) => cat.key?.toLowerCase() === entry.name)
      ?.color ?? COLORS[index % COLORS.length]
  );
}
