import { ModuleIdentifier } from "../../framework";

export interface AppState {}

export interface AppAPI {}

export const AppModule: ModuleIdentifier<AppAPI> = {
  symbol: Symbol.for("App"),
};
