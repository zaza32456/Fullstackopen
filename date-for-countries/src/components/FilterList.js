import React from 'react'
import "./FilterList.css"
import { useState } from 'react'
import { Country } from './Country'

export const FilterList = ({name}) => {
  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(!show)
  }

  return (
    <>
    <div className='list'>
      <div>{name}</div><button className='btn-show' onClick={handleShow}>show</button>
    </div>
    {show && 
      <Country name={name}/>}
    </>
  )
}
