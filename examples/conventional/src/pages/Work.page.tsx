import React from "react";
import {
  Container,
  Header,
  Segment,
  Grid,
  Placeholder,
} from "semantic-ui-react";
import { createPage } from "../framework";


const Work: React.FC = () => {
  return (
    <React.Fragment>
      <Segment inverted>
        <Container text>
          <Header
            as="h1"
            content="Work page example"
            inverted
            style={{
              fontSize: "4em",
              fontWeight: "normal",
              marginBottom: 0,
              marginTop: "1.5em",
            }}
          />
        </Container>
      </Segment>
      <Segment style={{ padding: "8em 0em" }}>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Placeholder>
                <Placeholder.Image square />
              </Placeholder>
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
  path: "/work",
  Component: Work
});
