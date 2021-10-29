import { ModuleIdentifier, Module, Layout, Page } from "./types";

export const createModule = <T extends ModuleIdentifier>(module: Module<T>) => {
  return module;
};

export const createPage = (page: Page) => {
  return page;
};

export const createLayout = (layout: Layout) => {
  return layout;
};
