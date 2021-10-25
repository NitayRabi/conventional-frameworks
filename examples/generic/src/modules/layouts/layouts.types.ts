import { ModuleIdentifier } from "../../framework";

export interface LayoutProps {
  Page: React.ComponentType;
}

export interface Layout {
  getComponent(): React.ComponentType<LayoutProps>;
}

export interface LayoutsState {
  layouts: Record<string, Layout>;
}

export interface LayoutsAPI {
  getLayout(name: string): Layout;
  addLayout(name: string, layout: Layout): void;
}

export const LayoutsModule: ModuleIdentifier<LayoutsAPI> = {
  symbol: Symbol.for("Layouts"),
};
