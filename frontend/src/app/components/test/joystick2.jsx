import React, { useMemo, useRef, useState } from 'react'
import { Joystick } from "react-joystick-component"
import './joystick.scss'

import ChevronUp from '../../assets/img/joystick/chevronUp.svg'
import ChevronDown from '../../assets/img/joystick/chevronDown.svg'
import ChevronLeft from '../../assets/img/joystick/chevronLeft.svg'
import ChevronRight from '../../assets/img/joystick/chevronRight.svg'

import movingUp from '../../assets/img/move/movingUp.svg'
import movingDown from '../../assets/img/move/movingDown.svg'
import rotateLeft from '../../assets/img/move/rotateLeft.svg'
import rotateRight from '../../assets/img/move/rotateRight.svg'

function GobeJoystickController({
  move,
  start,
  stop
}) 
{
  const [containerDiv, setContainerDiv] = useState();
  const containerStyle = useRef({
    width: "200px",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    justifyContent: "center",
    margin: "20px"
  }).current
  const baseColor = useMemo(
    () => `radial-gradient(circle at 50% 50%, rgba(42, 47, 86, 1),rgba(24, 27, 49, 1))`
  )
  const stickColor = useMemo(
    () => `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 1),rgba(119, 119, 119, 1))`
  )
  return (
    <div ref={setContainerDiv} style={containerStyle} className='test'>
      {containerDiv ? (
        <Joystick
          size={200}
          stickSize={80}
          baseColor={baseColor}
          stickColor={stickColor}
          throttle={400}
          move={move}
          stop={stop}
          start={start}
        />
        
      ) : null}
    </div>
  )
}

function JoystickComp() {
  const [direction, setDirection] = useState('')
  const [showImage1, setShowImage1] = useState(false)
  const [showImage2, setShowImage2] = useState(false)
  const [showImage3, setShowImage3] = useState(false)
  const [showImage4, setShowImage4] = useState(false)
  const handleMove = (e) => {
    const {x, y} = e
    if (x > 0.5 && -0.5 < y && y < 0.5) {
      setDirection('right')
      setShowImage1(true)
      setShowImage2(false)
      setShowImage3(false)
      setShowImage4(false)
    } else if (x < -0.5 && -0.5 < y && y < 0.5) {
      setDirection('left')
      setShowImage1(false)
      setShowImage2(true)
      setShowImage3(false)
      setShowImage4(false)
    } else if (y < -0.5 && -0.5 < x && x < 0.5) {
      setDirection('down')
      setShowImage1(false)
      setShowImage2(false)
      setShowImage3(true)
      setShowImage4(false)
    } else if (y > 0.5 && -0.5 < x && x < 0.5) {
      setDirection('up')
      setShowImage1(false)
      setShowImage2(false)
      setShowImage3(false)
      setShowImage4(true)
    } else {
      setDirection('')
      setShowImage1(false)
      setShowImage2(false)
      setShowImage3(false)
      setShowImage4(false)
    }
    console.log(e)
  }
  const handleStop = (e) => {
    // console.log(e)
    setShowImage1(false)
    setShowImage2(false)
    setShowImage3(false)
    setShowImage4(false)
  }
  const handleStart = (e) => {
    // console.log(e)
    setShowImage1(false)
    setShowImage2(false)
    setShowImage3(false)
    setShowImage4(false)
  }
  // console.log(direction)
  
  return (
    <div>
      <div>
        <GobeJoystickController
          opactiy={1}
          move={handleMove}
          stop={handleStop}
          start={handleStart}
        />
        {/* <div>
          <div className='chevronUp'>
            <img src={ ChevronUp } alt='Chevron Up' />
          </div>
          <div className='chevronDown'>
            <img src={ ChevronDown } alt='Chevron Down' />
          </div>
          <div className='chevronLeft'>
            <img src={ ChevronLeft } alt='Chevron Left' />
          </div>
          <div className='chevronRight'>
            <img src={ ChevronRight } alt='Chevron Right' />
          </div>
        </div> */}
      </div>
      <div>
        <div className='robot-chevronUp'>
          {showImage4 &&<img src={ movingUp } alt='Arrow up' className='robot-chevronUp-img'/>}
        </div>
        <div className='robot-chevronDown'>
          {showImage3 &&<img src={ movingDown } alt='Arrow down' className='robot-chevronUp-img'/>}
        </div>
        <div className='robot-chevronLeft'>
          {showImage2 &&<img src={ rotateLeft } alt='Rotate left' className='robot-chevronUp-img'/>}
        </div>
        <div className='robot-chevronRight'>
          {showImage1 &&<img src={ rotateRight } alt='Rotate right' className='robot-chevronUp-img'/>}
        </div>
      </div>
    </div>
  )
}

export default JoystickComp

