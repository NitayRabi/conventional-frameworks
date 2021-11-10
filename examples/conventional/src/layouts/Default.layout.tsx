import React from "react";
import { Container, Menu, Segment } from "semantic-ui-react";
import { useRuntimeAPI, LayoutComponent, createLayout } from "../framework";
import { LoggerModule } from "../modules/logger/logger.types";
import { Link, useLocation } from 'react-router-dom';

/**
 * Menu is implemented within the layout for simplicity. 
 * It should probably be extracted into a module. 
 */
const Default: LayoutComponent = ({ Page }) => {
  const { getApi } = useRuntimeAPI();
  const logger = getApi(LoggerModule);

  const { pathname } = useLocation();

  logger.log("Log from logger module!");
  return (
    <Segment
      inverted
      textAlign="center"
      style={{ minHeight: 700, padding: "1em 0em" }}
      vertical
    >
      <Menu inverted pointing secondary size="large">
        <Container>
          <Link to="/home"><Menu.Item as="div" active={pathname === '/home'}>Home</Menu.Item></Link>
          <Link to="/work"><Menu.Item as="div" active={pathname === '/work'}>Work</Menu.Item></Link>
          <Menu.Item as="a">Company</Menu.Item>
          <Menu.Item as="a">Careers</Menu.Item>
        </Container>
      </Menu>
      <Page />
      <Segment inverted vertical style={{ padding: "2em 0em" }}>
        <Container>Footer</Container>
      </Segment>
    </Segment>
  );
};

export default createLayout({
  name: "default",
  Component: Default,
});
