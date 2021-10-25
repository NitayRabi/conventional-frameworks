export interface ModuleIdentifier<T = any> {
  symbol: symbol;
  readonly api?: T;
}

export interface RuntimeAPI {
  getApi<T = any>(identifier: ModuleIdentifier<T>): T;
}

export const createModule = <T extends ModuleIdentifier>(module: Module<T>) => {
  return module;
};

export interface Module<T extends ModuleIdentifier = ModuleIdentifier> {
  identifier: T;
  declareApi?(): T["api"];
  execute?(api: RuntimeAPI): void;
}

export interface DefaultExportedFile<T> {
  default: T;
}

export type ConventionalFile = DefaultExportedFile<Module>;
