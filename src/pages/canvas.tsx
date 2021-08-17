import * as React from 'react'

import Panel from '../components/canvas/panel'

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.

const CanvasPage: React.FC = () => {
  return (
    <Panel />
  )
}


export default CanvasPage
