import React from "react";
import {
  Container,
  Header,
  Segment,
  Grid,
  Button,
  Placeholder,
} from "semantic-ui-react";
import { createPage } from "../framework";

const renderPlaceholder = () => (
  <Placeholder fluid>
    <Placeholder.Header as="h3" />
    <Placeholder.Line length="long" />
    <Placeholder.Line length="long" />
    <Placeholder.Line length="medium" />
  </Placeholder>
);

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Segment inverted>
        <Container text>
          <Header
            as="h1"
            content="Home page example"
            inverted
            style={{
              fontSize: "4em",
              fontWeight: "normal",
              marginBottom: 0,
              marginTop: "1.5em",
            }}
          />
          <Header
            as="h2"
            content="Do whatever you want when you want to."
            inverted
            style={{
              fontSize: "1.7em",
              fontWeight: "normal",
              marginTop: "1.5em",
              marginBottom: "1.5em",
            }}
          />
          <Button primary size="huge">
            Get Started
          </Button>
        </Container>
      </Segment>
      <Segment style={{ padding: "8em 0em" }}>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              {renderPlaceholder()}
              {renderPlaceholder()}
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Placeholder>
                <Placeholder.Image square />
              </Placeholder>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </React.Fragment>
  );
};

export default createPage({
  layout: "default",
  path: "/home",
  Component: Home,
  redirects: [{ from: "/" }],
});
