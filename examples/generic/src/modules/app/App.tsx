import React from "react";
import { AppState } from "./app.types";
import { observer } from "mobx-react-lite";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Page } from "../pages/pages.types";
import { LayoutsAPI, Layout } from "../layouts/layouts.types";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

export type AppProps = AppState & {
  pages: Page[];
  getLayout: LayoutsAPI["getLayout"];
};

const renderPageWithLayout = (
  Page: React.ComponentType,
  { getComponent }: Layout
) => {
  const Component = getComponent();
  return <Component Page={Page}></Component>;
};

const App: React.FC<AppProps> = ({ pages, getLayout }) => {
  return (
    <Router>
      <Switch>
        {pages.map(({ path, getComponent, layout }) => (
          <Route path={path}>
            {renderPageWithLayout(getComponent(), getLayout(layout))}
          </Route>
        ))}
        {
          pages.map(({ path, redirects }) => redirects?.map(({ from }) => {
            return (
              <Route key={from + path} path={from}>
                <Redirect to={path} />
              </Route>
            );
          }))
        }
      </Switch>
    </Router>
  );
};

export default observer(App);
