import { Container, createResolve } from "@owja/ioc";
import { Module, RuntimeAPI, ModuleIdentifier } from "./types";

export const createRuntimeAPI = (modules: Module[]) => {
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

  return api;
};

export const executeModules = (modules: Module[], api: RuntimeAPI) =>
  modules.forEach(({ execute }) => execute && execute(api));
