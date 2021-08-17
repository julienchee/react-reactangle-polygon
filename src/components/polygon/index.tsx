import React, { useEffect, useState } from 'react'
import styled from '../../utils/styled'
import Canvas from './canvas'

interface Props {
  events: [number, number, number, number][],
  gate: [number, number][]
}

const Polygon: React.FC<Props> = ({events, gate}) => {
  const [event, setEvent] = useState(events[0])
  const [dimentionXIndex, setDimentionXIndex] = useState(0)
  const [dimentionYIndex, setDimentionYIndex] = useState(1)
  const [sortedGate, setSortedGate] = useState(gate)
  const [innerResult, setInnerResult] = useState(false)

  const getEvent = (e: React.FormEvent<HTMLSelectElement>) => {
    const eventIndex = parseInt(e.currentTarget.value)
    const event = events[eventIndex]
    setEvent(event)
    setDimentionXIndex(0)
    setDimentionYIndex(1)
  }

  const getDimentionX = (e: React.FormEvent<HTMLSelectElement>) => {
    const positionIndex = parseInt(e.currentTarget.value)
    if (positionIndex === dimentionYIndex) {
      if (positionIndex === 0) {
        setDimentionYIndex(1)
      } else {
        setDimentionYIndex(0)
      }
    }
    setDimentionXIndex(positionIndex)
  }

  const getDimentionY = (e: React.FormEvent<HTMLSelectElement>) => {
    const positionIndex = parseInt(e.currentTarget.value)
    setDimentionYIndex(positionIndex)
  }

  useEffect(() => {
    let pos = [event[dimentionXIndex], event[dimentionYIndex]];
    let totalAngle = 0;

    sortedGate.forEach((gate, index) => {
      let angle = 0
      if (index === sortedGate.length - 1) {
        angle = find_angle(gate, pos, sortedGate[0])
      } else {
        angle = find_angle(gate, pos, sortedGate[index + 1])
      }
      totalAngle += angle
    })

    setInnerResult(totalAngle.toFixed(9) === (2 * Math.PI).toFixed(9))
  }, [event, dimentionXIndex, dimentionYIndex, sortedGate])

  const find_angle = (A: number[],B: number[],C: number[]) => {
    var AB = Math.sqrt(Math.pow(B[0]-A[0],2)+ Math.pow(B[1]-A[1],2));
    var BC = Math.sqrt(Math.pow(B[0]-C[0],2)+ Math.pow(B[1]-C[1],2));
    var AC = Math.sqrt(Math.pow(C[0]-A[0],2)+ Math.pow(C[1]-A[1],2));
    return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
}

  useEffect(() => {
    let balls = [];
    let isDragingBall = false;

    // Make points in ascending order by X-axis
    gate = gate.sort((gateA, gateB) => {
      return gateA[0] - gateB[0]
    })

    // Find the left and right poles of the X-axis
    let firstGate = gate[0],
        lastGate = gate[gate.length -1];
    let smallXGate = gate.filter(pos => pos[0] === firstGate[0]),
        bigXGate = gate.filter(pos => pos[0] === lastGate[0])

    // Handling multiple cases of left and right poles
    if (smallXGate.length > 1) {
      smallXGate.sort((gateA, gateB) => {
        return gateB[1] - gateA[1]
      })
    }
    if (bigXGate.length > 1) {
      bigXGate.sort((gateA, gateB) => {
        return gateB[1] - gateA[1]
      })
    }

    firstGate = smallXGate[0]
    lastGate = bigXGate[0]

    // Obtain the angle of the pole connection
    let splitLineAngle = Math.atan2(lastGate[1] - firstGate[1], lastGate[0] - firstGate[0]);
    let upperGate = new Array();
    let lowerGate = new Array();

    // All other points and the first Ball calculation angle
    // Those larger than splitLineAngle are lower chains.
    // Others are on the chain.
    gate.forEach(pos => {
      if (pos === firstGate || pos === lastGate) {
        return false
      }
      let angle = Math.atan2(pos[1] - firstGate[1], pos[0] - lastGate[0]);
      if (angle > splitLineAngle) {
        lowerGate.push(pos)
      } else {
        upperGate.push(pos)
      }
    })

    // Sorting to handle the same situation on the X-axis
    lowerGate = lowerGate.sort((gateA, gateB) => {
      if (gateA[0] !== gateB[0]) {
        return gateA[0] - gateB[0]
      }
      return gateB[1] - gateA[1]
    })

    upperGate = upperGate.sort((gateA, gateB) => {
      if (gateA[0] !== gateB[0]) {
        return gateB[0] - gateA[0]
      }
      return gateA[1] - gateB[0]
    })

    // Connect all points counterclockwise
    balls = [firstGate].concat(lowerGate, [lastGate], upperGate)
    setSortedGate(balls)
  }, [])

  return (
    <Container>
      <EventsContainer>
        <select defaultValue={0} onChange={getEvent}>
          {
            events.map((event, index) => (
              <option key={index} value={index}>{event.map((point, pointIndex) => pointIndex === 0 ? point : `, ${point}`)}</option>
            ))
          }
        </select>
        <select defaultValue={0} onChange={getDimentionX}>
          {
            event.map((position, index) =>
              <option key={index} value={index}>{position}</option>
            )
          }
        </select>
        <select value={dimentionYIndex} onChange={getDimentionY}>
          {
            event.map((position, index) =>
                <option key={index} value={index} disabled={index === dimentionXIndex} >{position}</option>
            )
          }
        </select>
      </EventsContainer>
      <div>
        result: {innerResult ? 'YES' : 'NO'}
      </div>
      <Canvas events={events} gate={sortedGate} x={event[dimentionXIndex]} y={event[dimentionYIndex]} result={innerResult} />
    </Container>
  )
}

export default Polygon

const Container = styled('div')`
	width: 1200px;
	height: 900px;
	box-shadow: 5px 5px 5px 5px grey;
	margin: 20px auto;
	display: flex;
  flex-direction: column;
	align-items: center;
	justify-content: space-around;
`

const EventsContainer = styled('div')``
