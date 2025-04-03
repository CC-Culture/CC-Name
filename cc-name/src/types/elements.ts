export type ElementType = "金" | "木" | "水" | "火" | "土";

export interface ElementAnalysis {
  [key in ElementType]: number;
}

export const ELEMENT_NAMES: Record<ElementType, string> = {
  金: "Metal",
  木: "Wood",
  水: "Water",
  火: "Fire",
  土: "Earth",
};

export const ELEMENT_COLORS: Record<ElementType, string> = {
  金: "#FFDF00",
  木: "#228B22",
  水: "#1E90FF",
  火: "#FF4500",
  土: "#8B4513",
};
