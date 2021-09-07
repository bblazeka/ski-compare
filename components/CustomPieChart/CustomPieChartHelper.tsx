import { CATEGORIES, COLORS } from "config/preferences";

export function mapToPieData(distribution: any[]): PieData[] {
  return distribution.map((el) => {
    return Object.assign(el, {
      catName: CATEGORIES.find(
        (cat: Category) => cat.key?.toLowerCase() === el.name
      )?.name,
      id: el.name,
    });
  });
}

export function getColor(entry: any, index: number) {
  return (
    CATEGORIES.find((cat: Category) => cat.key?.toLowerCase() === entry.name)
      ?.color ?? COLORS[index % COLORS.length]
  );
}
