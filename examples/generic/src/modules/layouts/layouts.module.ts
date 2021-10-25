import { createModule } from "../../framework";
import Default from "./Default";
import { LayoutsAPI, LayoutsModule, LayoutsState } from "./layouts.types";
import { makeAutoObservable } from "mobx";

const layoutsState = makeAutoObservable<LayoutsState & LayoutsAPI>({
  layouts: {
    default: {
      getComponent: () => Default,
    },
  },
  getLayout(name) {
    return this.layouts[name];
  },
  addLayout(name, layout) {
    layoutsState.layouts[name] = layout;
  },
});

export default createModule({
  identifier: LayoutsModule,
  declareApi: () => ({
    getLayout: (...args) => layoutsState.getLayout(...args),
    addLayout: (...args) => layoutsState.addLayout(...args),
  }),
});
