import React from "react";
import ReactDOM from "react-dom";
import { createModule } from "../../framework";
import { AppModule } from "./app.types";
import App from "./App";
import { PagesModule } from "../pages/pages.types";
import { LayoutsModule } from "../layouts/layouts.types";

export default createModule({
  identifier: AppModule,
  execute: ({ getApi }) => {
    const pages = getApi(PagesModule).getPages();
    const getLayout = getApi(LayoutsModule).getLayout;
    ReactDOM.render(
      <React.StrictMode>
        <App pages={pages} getLayout={getLayout} />
      </React.StrictMode>,
      document.getElementById("root")
    );
  },
});
