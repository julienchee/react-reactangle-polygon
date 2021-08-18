import React, { useState } from 'react'
import styled from '../../utils/styled'

import Canvas from './canvas'
import DrawButton from './button'
import ColorInput from './input'

class RectInfo {
  fillColor: string
  rectInfo: any

  constructor(newRectInfo = [0, 0, 0, 0]){
    this.fillColor = '#fff'
    this.rectInfo = newRectInfo
  }

  checkIn = (x: number, y: number) => {
    if ((this.rectInfo[0] < x) && (this.rectInfo[1] < y) && (this.rectInfo[0] + this.rectInfo[2] > x) && (this.rectInfo[1] + this.rectInfo[3] > y)) {
      return true
    }

    return false
  }

  onChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.fillColor =  e.currentTarget.value
  }
}

class RectInfoList {
  rectList: RectInfo[]
  selectedItem: number

  constructor() {
    this.selectedItem = 0
    this.rectList = [] 
  }

  mouseDown = (x: number, y: number) => {
    console.log('fff');
    for (let i = this.rectList.length - 1; i >= 0; i--) {
      if (this.rectList[i].checkIn(x, y)) {
        this.selectedItem = i;
        break;
      }
    }
  }

  mouseMove = (dx: number, dy: number) => {
    if (this.rectList.length > 0) {
      this.rectList[this.selectedItem].rectInfo[0] += dx
      this.rectList[this.selectedItem].rectInfo[1] += dy
    }
  }
}

const Panel: React.SFC = () => {
  const max = 400, min = 0
  const orectInfoList = new RectInfoList()
  const [rectInfoList, setRectInfoList] = useState(orectInfoList)

  // const defaultRectInfo = [100, 100, 200, 200]
  // const [rectInfo, setRectInfo] = useState(defaultRectInfo)

  const onClick = () => {
    const posX = Math.floor(Math.random() * (max - min + 1)) + min;
    const posY = Math.floor(Math.random() * (max - min + 1)) + min;
    const width = Math.floor(Math.random() * (max - posX + 1)) + min;
    const height = Math.floor(Math.random() * (max - posY + 1)) + min;

    const newRectInfo = [posX, posY, width, height]
    // setRectInfo(newRectInfo)

    let newRect = new RectInfo(newRectInfo)
    rectInfoList.rectList.push(newRect)
    changeRectInfoList();
    // console.log(rectInfoList.rectList);
  }

  const changeRectInfoList = () => {
    let newRectInfoList = new RectInfoList()
    newRectInfoList.rectList = rectInfoList.rectList
    newRectInfoList.selectedItem = rectInfoList.selectedItem
    
    setRectInfoList(newRectInfoList)
  }

  const inputList = () => {
    const items = []

    for( let i of (rectInfoList.rectList) ) {
      items.push(<ColorInput name='color' label='Input fill color: ' onChange={i.onChange} />)
    }

    return items
  }

  return (
    <PanelContainer>
      <Canvas rectInfoList={rectInfoList} mouseDown={rectInfoList.mouseDown}  mouseMove={rectInfoList.mouseMove} changeRectInfoList={changeRectInfoList}/>
      <DrawButton children='Draw Rectangle' onClick={onClick} />
{/*      {
        inputList
      }*/}
    </PanelContainer>
  )
}

export default Panel

const PanelContainer = styled('div')`
	width: 800px;
	height: 600px;
	box-shadow: 5px 5px 5px 5px grey;
	margin: 50px auto;
	display: flex;
  flex-direction: column;
	align-items: center;
	justify-content: space-around;
`
