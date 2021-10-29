import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeAutoObservable } from "mobx";
import { Layout, AppState, AppAPI } from "./types";
import { createRuntimeAPI, executeModules } from "./appApi";
import { getLayouts, getModules, getPages } from "./conventionsGatherer";

const { pages, onPagesChange } = getPages();
const { layouts, onLayoutsChange } = getLayouts();
const { modules, onModulesChange } = getModules();

const toLayoutDictionary = (arr: Layout[]) =>
  arr.reduce<Record<string, Layout>>((acc, val) => {
    acc[val.name] = val;
    return acc;
  }, {});

export const state = makeAutoObservable<AppState & AppAPI>({
  runtimeAPI: createRuntimeAPI(modules),
  pages,
  layouts: toLayoutDictionary(layouts),
  setPages(pages) {
    this.pages = pages;
  },
  setLayouts(layouts) {
    this.layouts = toLayoutDictionary(layouts);
  },
  getLayout(name) {
    return this.layouts[name];
  },
  setRuntimeAPI(api) {
    this.runtimeAPI = api;
  },
});

export const bootstrap = () => {
  onPagesChange(state.setPages.bind(state));
  onLayoutsChange(state.setLayouts.bind(state));
  onModulesChange((updatedModules) => {
    const api = createRuntimeAPI(updatedModules);
    state.setRuntimeAPI(api);
    executeModules(updatedModules, api);
  });

  ReactDOM.render(
    <React.StrictMode>
      <App state={state} />
    </React.StrictMode>,
    document.getElementById("root")
  );

  executeModules(modules, state.runtimeAPI);
};
