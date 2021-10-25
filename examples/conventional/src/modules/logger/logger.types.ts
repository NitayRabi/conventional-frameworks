import { ModuleIdentifier } from "../../framework/framework";

type LogFunction = (...args: string[]) => void;

export interface LoggerAPI {
  log: LogFunction;
  error: LogFunction;
  warn: LogFunction;
}

export const LoggerModule: ModuleIdentifier<LoggerAPI> = {
  symbol: Symbol.for("Logger"),
};
