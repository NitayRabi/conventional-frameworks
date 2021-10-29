import { ModuleIdentifier, Module } from "./types";

export const createModule = <T extends ModuleIdentifier>(module: Module<T>) => {
  return module;
};
