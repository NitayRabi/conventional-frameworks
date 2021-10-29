import { Layout } from "./types";

export const toLayoutDictionary = (arr: Layout[]) =>
  arr.reduce<Record<string, Layout>>((acc, val) => {
    acc[val.name] = val;
    return acc;
  }, {});
