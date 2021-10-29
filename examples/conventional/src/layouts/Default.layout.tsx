import React from "react";
import { observer } from "mobx-react-lite";
import { Container, Menu, Segment } from "semantic-ui-react";
import { useRuntimeAPI, LayoutComponent, createLayout } from "../framework";
import { LoggerModule } from "../modules/logger/logger.types";

const Default: LayoutComponent = ({ Page }) => {
  const { getApi } = useRuntimeAPI();
  const logger = getApi(LoggerModule);

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
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
          <Menu.Item as="a">Work</Menu.Item>
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
  Component: observer(Default),
});
