import { Container, createResolve } from "@owja/ioc";
import {
  ConventionalFile,
  DefaultExportedFile,
  ModuleIdentifier,
  RuntimeAPI,
  Module,
} from "./framework";

const extractDefaultExport = <T>(module: DefaultExportedFile<T>) =>
  module.default;

const getModulesFromContext = (ctx: ReturnType<typeof require.context>) =>
  ctx.keys().map<ConventionalFile>(ctx).map(extractDefaultExport);

const getModulesContext = () =>
  require.context("../modules", true, /\.module\.tsx?$/);
const getConventionalModules = () => {
  const moduleContext = getModulesContext();
  const modules = getModulesFromContext(moduleContext);
  const onModulesChange = (cb: (updated: Module[]) => void) => {
    module.hot &&
      module.hot.accept(moduleContext.id, function () {
        const newContext = getModulesContext();
        const updateModules = getModulesFromContext(newContext);
        cb(updateModules);
      });
  };

  return { modules, onModulesChange };
};

const bootstrapModules = (modules: Module[]) => {
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

  modules.forEach(({ execute }) => execute && execute(api));
};

export function bootstrap() {
  const { modules, onModulesChange } = getConventionalModules();
  bootstrapModules(modules);
  onModulesChange(bootstrapModules);
}
