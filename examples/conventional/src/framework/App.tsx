import React from "react";
import { observer } from "mobx-react-lite";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Layout } from "./types";
import "semantic-ui-css/semantic.min.css";
import { AppAPI, AppState, PageComponent } from "./types";

const renderPageWithLayout = (Page: PageComponent, { Component }: Layout) => {
  return <Component Page={Page}></Component>;
};

const App: React.FC<{ state: AppState & AppAPI }> = ({ state }) => {
  return (
    <Router>
      <Switch>
        {state.pages.map(({ path, Component, layout, redirects }) => (
          <React.Fragment key={path}>
            <Route path={path}>
              {renderPageWithLayout(Component, state.getLayout(layout))}
            </Route>
            {redirects?.map(({ from }) => {
              return (
                <Route key={from + path} path={from}>
                  <Redirect to={path} />
                </Route>
              );
            })}
          </React.Fragment>
        ))}
      </Switch>
    </Router>
  );
};

export default observer(App);
