import { Container, createResolve } from "@owja/ioc";
import {
  ConventionalFile,
  DefaultExportedFile,
  ModuleIdentifier,
  RuntimeAPI,
  Module,
} from "./types";

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
  const resolveApi = createResolve(container);
  const api: RuntimeAPI = {
    getApi: <T>({ symbol }: ModuleIdentifier<T>) => resolveApi<T>(symbol)(),
  };
  modules.forEach(({ identifier, createApi }) => {
    createApi &&
      container
        .bind<any>(identifier.symbol)
        .toFactory(createApi)
        .inSingletonScope();
  });

  modules.forEach(({ execute }) => execute && execute(api));
};

export function bootstrap() {
  const { modules, onModulesChange } = getConventionalModules();
  bootstrapModules(modules);
  onModulesChange(bootstrapModules);
}
