import { createModule } from "../../framework";
import { LoggerModule } from "./logger.types";

export default createModule({
  identifier: LoggerModule,
  // TODO - replace me with better logger
  createApi: () => ({ ...console }),
});
