import * as React from 'react'
import { connect } from 'react-redux'
import Polygon from '../components/polygon'
import { ApplicationState } from '../store'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  events: [number, number, number, number][],
  gate: [number, number][]
}

const polygonPage: React.FC<PropsFromState> = (props) => {
  return (
    <Polygon {...props} />
  )
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ polygon }: ApplicationState) => ({
  events: polygon.events,
  gate: polygon.gate
})

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(mapStateToProps)(polygonPage)
