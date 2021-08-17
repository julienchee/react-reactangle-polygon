import React, { useRef, useEffect, MouseEvent, useState } from 'react'
import styled from '../../utils/styled'

interface CanvasProps {
  rectInfoList: any
  mouseDown: (x: number, y: number) => void
  mouseMove: (x: number, y: number) => void
}

const Canvas: React.SFC<CanvasProps> = ({rectInfoList, mouseDown, mouseMove}) => {
  let canvasRef = useRef<HTMLCanvasElement | null>(null);
  let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const [movementStatus, setMovementStatus] = useState(Boolean)
  const [firstPos, setFirstPos] = useState([0,0])

  useEffect(() => {
    // Initialize
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      let ctx = canvasCtxRef.current; // Assigning to a temp variable
      ctx!.beginPath(); // Note the Non Null Assertion
      ctx!.clearRect(0,0,400,400)
      console.log(rectInfoList.rectList)
      for (let i of rectInfoList.rectList) {
        console.log(i)
        ctx!.strokeStyle = '#000';
        // let temp = rectInfoList.rectList[i]
        let temp = i
        ctx!.fillStyle = temp.fillColor;
        ctx!.fillRect(temp.rectInfo[0], temp.rectInfo[1], temp.rectInfo[2], temp.rectInfo[3])
        ctx!.rect(temp.rectInfo[0], temp.rectInfo[1], temp.rectInfo[2], temp.rectInfo[3])
            
        ctx!.stroke();
        ctx!.beginPath(); // Note the Non Null Assertion
        ctx!.fillStyle = 'red'
        ctx!.arc(temp.rectInfo[0], temp.rectInfo[1], 8, 0, 2 * Math.PI)
        ctx!.fill()
        ctx!.stroke();
      }


    }
  }, [rectInfoList])

  const handleEvent = (event: MouseEvent) => {
    if (canvasRef.current) {
      if (event.type === 'mousedown') {
        const x = event.pageX - canvasRef.current.offsetLeft
        const y = event.pageY - canvasRef.current.offsetTop
        setMovementStatus(true)
        setFirstPos([x, y])
        mouseDown(x, y)
      }

      if (event.type === 'mousemove' && movementStatus) {
        const w = event.pageX - canvasRef.current.offsetLeft - firstPos[0]
        const h = event.pageY - canvasRef.current.offsetTop - firstPos[1]
        mouseMove(w, h)
      }

      if (event.type === 'mouseup') {
        setMovementStatus(false)
      }
    }
  }

  return (
    <DrawRect ref={canvasRef} width={400} height={400} onMouseDown={handleEvent} onMouseMove={handleEvent} onMouseUp={handleEvent} />
  )
}
export default Canvas

const DrawRect = styled('canvas')`
  box-shadow: 0px 0px 2px 2px grey;
  background-color: white;
`