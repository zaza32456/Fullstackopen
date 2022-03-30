import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import noteService from './services/persons'
import Message from './components/Message'
import './index.css'

export default function App() {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [find, setFind] = useState('')
  const [message, setMessage] = useState(null)

  //查询电话本信息
  useEffect(() => {
    noteService
      .getAll()
      .then(returnedNote => {
        setPersons(returnedNote)
      })
  }, [])
  
  //输入姓名 - 事件处理程序
  const inputName = (e) => {
    setNewName(e.target.value)
  }
  //输入号码 - 事件处理程序
  const inputNumber = (e) => {
    setNewNumber(e.target.value)
  }

  //辅助数组：获取电话本内所有人员姓名
  let nameArr = persons.map(n => n.name)
  //筛选姓名
  const findPerson = (e) => { setFind(e.target.value) }
  let findStr = new RegExp(".*"+ find +".*","i")

  //增加电话本人员信息 - 事件处理程序
  const addNote = (e) => {
    e.preventDefault()

    //判断是否重名
    if (nameArr.find(n => n === newName)) {
      const oldNote = persons.find(n => n.name === newName)
      console.log(oldNote)
      const newNote = {...oldNote, number: newNumber}
      console.log("newNote是", newNote)
      //如果重名，选择是否更新号码
      if (window.confirm(`${newName} is already added to phonebook,replace the old number with a new one?`)) {
        noteService
          .update(oldNote.id, newNote)
          .then(returnedData => {
            console.log("returnedData是", returnedData)
            setPersons(
              persons.map(persons => 
                persons.id === oldNote.id
                ?returnedData
                :persons)
            )
            //增加修改号码message
            setMessage(`Changed ${newName}'s number to ${newNumber} `)
            setTimeout(() => {
              setMessage(null)
            }, 4000)
            setNewName("")
            setNewNumber("")
          })
          .catch(error => {
            alert("error!")
          })
        return;
      }else {
        return;
      }
    } 
      
    const newPerson = {
      name: newName,
      number: newNumber,
      id: newName
    }
  
    noteService
      .create(newPerson)
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
        setMessage(`Added ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 4000) 
        setNewName("")
        setNewNumber("")
      })
  
  }

  //删除电话本人员信息 - 事件处理程序
  const delPerson = id => {

    console.log(`我要删除ID为${id}的人员`)
    const delperson = persons.find(n => n.id === id) //获得数据的思维有问题，总是用person[id]
    console.log("presons = ", delperson)
    if (window.confirm(`Delete ${delperson.name} ?`)) {
      noteService
        .del(id)
        .then(setPersons(persons.filter(n => n.id !== id)))
        .catch(error => {
          alert("error!")
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>

      {message !== null &&
        <Message message={message}/>
      }

      <Filter 
        findPerson={findPerson} 
        find={find}
      />

      <h2>add a new</h2>

      <PersonForm 
        addNote={addNote} 
        inputName={inputName} 
        inputNumber={inputNumber} 
        newName={newName} 
        newNumber={newNumber} 
      />

      <h2>Numbers</h2>

      <Persons 
        persons={persons} 
        findStr={findStr}
        del={delPerson}
      />
    </div>
  )
}

