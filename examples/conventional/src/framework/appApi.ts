import { Container, createResolve } from "@owja/ioc";
import { Module, RuntimeAPI, ModuleIdentifier } from "./types";

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
