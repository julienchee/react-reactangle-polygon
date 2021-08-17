import React, { useRef, useEffect, useState } from 'react'
import styled from '../../utils/styled'

interface CanvasProps {
  events: [number, number, number, number][],
  gate: [number, number][],
  x: number,
  y: number,
  result: boolean
}

const Canvas: React.SFC<CanvasProps> = ({events, gate, x, y, result}) => {
  let canvasRef = useRef<HTMLCanvasElement | null>(null);
  let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    // Initialize
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      let ctx = canvasCtxRef.current; // Assigning to a temp variable

      ctx!.beginPath(); // Note the Non Null Assertion
      gate.forEach((pos, index) => {
        if (index === 0) {
          ctx!.moveTo(pos[0] / 1000, pos[1] / 1000)
        } else {
          ctx!.lineTo(pos[0] / 1000, pos[1] / 1000)
        }
      })
      ctx!.lineTo(gate[0][0] / 1000, gate[0][1] / 1000)
      ctx!.stroke();
    }
  }, [])

  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      let ctx = canvasCtxRef.current; // Assigning to a temp variable
      ctx!.beginPath();
      ctx!.fillStyle = 'red'
      ctx!.arc(x / 1000, y / 1000, 4, 0, 2 * Math.PI)
      ctx!.fill()
      ctx!.stroke();
    }
  }, [x, y])

  return (
    <DrawRect ref={canvasRef} width={400} height={400} />
  )
}
export default Canvas

const DrawRect = styled('canvas')`
  box-shadow: 0px 0px 2px 2px grey;
  background-color: white;
`
