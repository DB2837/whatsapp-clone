import React from 'react'
import styled from 'styled-components'

const Avatar = () => {
  return (
    <Circle>
      <p>Av</p>
    </Circle>
  )
}

export default Avatar

const Circle = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  /*  border: 2px solid #fff; */
  background-color: #565656;
  color: #fa8925;
  font-weight: bold;
`
