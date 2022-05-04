import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Country } from './Country'
import { FilterList } from './FilterList'

export const Filter = ({text}) => {

  const [countriesArr, setCountriesArr] = useState([])
  const [filterArr, setFilterArr] = useState([])

  async function getCountries() {
    const res = await axios.get("https://restcountries.com/v3.1/all")
    const arr = res.data.map(n => n.name.common)
    // console.log("arr = ", arr,"arr.length = ", arr.length)
    setCountriesArr(arr) 
  }

  useEffect(() => {
    getCountries()
  },[])
    

  useEffect(() => {
    //注意：正则表达式不能是字符串！
    let reg = new RegExp(`${text}`, "ig" )
    let res = countriesArr.filter(n => reg.test(n))
    console.log("filterArr = ", res)
    setFilterArr(res)
  },[text])

  console.log("filterArr.length = ", filterArr.length)


  return (
    <>
      {(filterArr.length === 1) && 
        <Country name={filterArr}/>}

      {(filterArr.length < 10 && filterArr.length > 1) 
        && <div>{filterArr.map(name => <FilterList key={name} name={name}/>)}</div>}

      {(filterArr.length >= 10) && 
        <div>Too many matches, specify another filter</div>}
        
      {(filterArr.length === 0) && 
        <div>Please enter some words to query</div>}
 
    </>

  )
}
