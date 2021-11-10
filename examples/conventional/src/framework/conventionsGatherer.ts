import {
  DefaultExportedFile,
  ConventionType,
  ConventionalFile,
  ConventionToModuleType,
} from "./types";

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
    page: getPagesContext,
    layout: getLayoutsContext,
    module: getModulesContext,
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
