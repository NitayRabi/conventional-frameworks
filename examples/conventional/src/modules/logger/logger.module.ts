import { createModule } from "../../framework/framework";
import { LoggerModule } from "./logger.types";

export default createModule({
  identifier: LoggerModule,
  // TODO - replace me with better logger
  declareApi: () => ({ ...console }),
});
