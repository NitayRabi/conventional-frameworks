import React from "react";
import { Container, createResolve } from "@owja/ioc";

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

const extractDefaultExport = <T>(module: DefaultExportedFile<T>) =>
  module.default;

const getModulesFromContext = <T extends ConventionType>(
  ctx: ReturnType<typeof require.context>
) => ctx.keys().map<ConventionalFile<T>>(ctx).map(extractDefaultExport);

const getPagesContext = () => require.context("../pages", true, /\.page\.tsx$/);
const getLayoutsContext = () =>
  require.context("../layouts", true, /\.layout\.tsx$/);
const getModulesContext = () =>
  require.context("../modules", true, /\.module\.tsx?$/);

const getConventionContext = (type: ConventionType) => {
  const conventionGetterByType = {
    module: getModulesContext,
    page: getPagesContext,
    layout: getLayoutsContext,
  };
  return conventionGetterByType[type]();
};

export const getConventionalModules = <T extends ConventionType>(type: T) => {
  const moduleContext = getConventionContext(type);
  const modules: Array<ConventionToModuleType[T]> =
    getModulesFromContext(moduleContext);
  const onModulesChange = (
    cb: (updated: Array<ConventionToModuleType[T]>) => void
  ) => {
    module.hot &&
      module.hot.accept(moduleContext.id, function () {
        console.log("Updated:", type);
        const newContext = getConventionContext(type);
        const updateModules: Array<ConventionToModuleType[T]> =
          getModulesFromContext(newContext);
        cb(updateModules);
      });
  };

  return { modules, onModulesChange };
};

export const getPages = () => {
  const { modules, onModulesChange } = getConventionalModules("page");
  return { pages: modules, onPagesChange: onModulesChange };
};

export const getLayouts = () => {
  const { modules, onModulesChange } = getConventionalModules("layout");
  return { layouts: modules, onLayoutsChange: onModulesChange };
};

export const getModules = () => getConventionalModules("module");

export const createRuntimeAPI = (modules: Module[]) => {
  const container = new Container();
  const resolve = createResolve(container);
  const api: RuntimeAPI = {
    getApi: <T>({ symbol }: ModuleIdentifier<T>) => resolve<T>(symbol)(),
  };
  modules.forEach(({ identifier, declareApi }) => {
    declareApi &&
      container
        .bind<any>(identifier.symbol)
        .toFactory(declareApi)
        .inSingletonScope();
  });

  return api;
};

export const executeModules = (modules: Module[], api: RuntimeAPI) =>
  modules.forEach(({ execute }) => execute && execute(api));

export const createModule = <T extends ModuleIdentifier>(module: Module<T>) => {
  return module;
};

export const createPage = (page: Page) => {
  return page;
};

export const createLayout = (layout: Layout) => {
  return layout;
};
