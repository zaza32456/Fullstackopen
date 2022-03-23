import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


export default function App() {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: "040-123456" ,
      id: 1
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [find, setFind] = useState('')
  
  //辅助数组：获取电话本内所有人员姓名
  let nameArr = persons.map(n => n.name)
  console.log(nameArr)
  
  //筛选姓名
  const findPerson = (e) => {
    setFind(e.target.value)
  }

  let findStr = new RegExp(".*"+ find +".*","i")
  console.log(findStr)

  //输入姓名 - 事件处理程序
  const inputName = (e) => {
    setNewName(e.target.value)
  }
  //输入号码 - 事件处理程序
  const inputNumber = (e) => {
    setNewNumber(e.target.value)
  }


  //增加电话本人员信息 - 事件处理程序
  const addNote = (e) => {
    e.preventDefault()

    if (nameArr.find(n => n === newName)) {
      return alert(`${newName} is already added to phonebook!`)
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id:persons.length + 1
    }
    console.log(newPerson)
    setPersons(persons.concat(newPerson))
    setNewName("")
    setNewNumber("")
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter findPerson={findPerson} find={find}/>
      <h2>add a new</h2>
      <PersonForm addNote={addNote} inputName={inputName} inputNumber={inputNumber} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} findStr={findStr}/>
    </div>
  )
}

