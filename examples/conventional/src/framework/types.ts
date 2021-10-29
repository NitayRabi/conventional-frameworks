import React from "react";

export type ConventionType = "module" | "page" | "layout";

export interface ModuleIdentifier<T = any> {
  symbol: symbol;
  readonly api?: T;
}

export interface RuntimeAPI {
  getApi<T = any>(identifier: ModuleIdentifier<T>): T;
}

export interface Module<T extends ModuleIdentifier = ModuleIdentifier> {
  identifier: T;
  declareApi?(): T["api"];
  execute?(api: RuntimeAPI): void;
}

export interface Redirect {
  from: string;
}

export type PageComponent = React.ComponentType;

export type Page = {
  Component: PageComponent;
  layout: string;
  path: string;
  redirects?: Redirect[];
};

export type LayoutComponent = React.ComponentType<{ Page: PageComponent }>;

export type Layout = {
  name: string;
  Component: LayoutComponent;
};

export interface ConventionToModuleType {
  module: Module;
  page: Page;
  layout: Layout;
}

export interface DefaultExportedFile<T> {
  default: T;
}

export type ConventionalFile<T extends ConventionType> = DefaultExportedFile<
  ConventionToModuleType[T]
>;

export interface AppState {
  runtimeAPI: RuntimeAPI;
  pages: Page[];
  layouts: Record<string, Layout>;
}

export interface AppAPI {
  setPages(pages: Page[]): void;
  setLayouts(layouts: Layout[]): void;
  setRuntimeAPI(api: RuntimeAPI): void;
  getLayout(name: string): Layout;
}
