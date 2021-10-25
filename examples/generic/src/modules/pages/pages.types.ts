import { ModuleIdentifier } from "../../framework";

export interface Redirect {
  from: string;
}

export interface Page {
  layout: string;
  path: string;
  getComponent(): React.ComponentType;
  redirects?: Redirect[];
}

export interface PagesState {
  pages: Page[];
}

export interface PagesAPI {
  getPages(): Page[];
  addPage(page: Page): void;
}

export const PagesModule: ModuleIdentifier<PagesAPI> = {
  symbol: Symbol.for("Pages"),
};
