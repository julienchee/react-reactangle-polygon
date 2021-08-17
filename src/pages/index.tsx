import * as React from 'react'
import Page from '../components/layout/Page'
import Container from '../components/layout/Container'
import styled from '../utils/styled'

function IndexPage() {
  return (
    <Page>
      <Container>
        <PageContent>
          <h1>Description</h1>
          <h2>Challenge first section: </h2>
          <p>
          Part 1: Create 2 React components: the first one (let’s call it Panel) contains the second one, and the second one contains a HTML5 Canvas (as such, let’s call it Canvas).
          <br />

          Part 2: Add a button to the Panel component. This button should add a new random rectangle fitting inside the canvas’ width and height (400 x 400). You may consider a rectangle an object like this:

          The rectangle X and Y  position should be related to the position of the red dot.

          <br />
          Part 3: Add a Text Input for each existing rectangle. It should contain, by default, the current color of a rectangle (for example, “#000”) and when typed inside, it should change the color of the rectangle.
          <br />
          Part 4: Create a system that allows a user to drag and drop any rectangle inside of the canvas. Use redux to capture and propagate that change down the component tree through Panel. 
          </p>

          <h2>Challenge second section: </h2>

          <p>
           Suppose you are given the JSON file below through Redux.. 
          <br />
          Each event has 4 dimensions. E.g. event 1 is [ 198619, 182327, 96947, 196635] so dimension 0 is 198619, dimension 1 is 182327, dimension 2 is 96947 and dimension 3 is 196635.
          <br />
          Implement a function that returns a boolean value for each item in the “events”: if the event on the given dimensions are inside of the polygon (2D) defined on by “gate”, it’s value has to be “true” and if not, “false”.
          <br />
          This function should receive 4 parameters: events, gate, dimensionX, dimensionY. dimensionX and dimensionY are numbers between 0 and 3., Suppose you have dimensionX = 2 and dimensionY = 3, and the event 
          [ 198619, 182327, 96947, 196635 ], the value for this event at dimensionX is 96947 and at dimensionY is 196635 and the function must compute whether that point is inside the gate.

          </p>
        </PageContent>
      </Container>
    </Page>
  )
}

export default IndexPage

const PageContent = styled('article')`
  max-width: ${props => props.theme.widths.md};
  margin: 0 auto;
  line-height: 1.6;

  a {
    color: ${props => props.theme.colors.brand};
  }

  h1,
  h2,
  h3,
  h4 {
    margin-bottom: 0.5rem;
    font-family: ${props => props.theme.fonts.headings};
    line-height: 1.25;
  }
`
