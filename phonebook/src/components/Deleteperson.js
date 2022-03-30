import React from 'react'
import noteService from '../services/persons'

const Deleteperson = ({id, del}) => {
  return (
    //为什么这里要用() => ?
    <button onClick={() => del(id)}>delete</button>
  )
}

export default Deleteperson