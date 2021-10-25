import { createModule } from "../../framework";
import { PagesAPI, PagesModule, PagesState } from "./pages.types";
import { makeAutoObservable } from "mobx";
import Home from "./Home";

const state = makeAutoObservable<PagesState & PagesAPI>({
  pages: [
    {
      path: "/home",
      getComponent: () => Home,
      layout: "default",
      redirects: [{ from: "/" }],
    },
  ],
  getPages() {
    return this.pages;
  },
  addPage(page) {
    this.pages.push(page);
  },
});

export default createModule({
  identifier: PagesModule,
  declareApi: () => ({
    addPage: (...args) => state.addPage(...args),
    getPages: () => state.getPages(),
  }),
});
