import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./Country.css"


export const Country = ({name}) => {
  const [loading, setLoading] = useState(true)
  const [countryInfo, setcountryInfo] = useState({})
  const [weatherInfo, setWeatherInfo] = useState({})
  const apiKey = process.env.REACT_APP_API_KEY

  async function getCountryData(name) {
    const countryinfo = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    // console.log("countryinfo", countryinfo.data[0].capital)
    setcountryInfo(countryinfo.data[0])
    const weatherinfo = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${countryinfo.data[0].capital}&units=metric&appid=${apiKey}`)
    // console.log("weatherinfo", weatherinfo.data)
    setWeatherInfo(weatherinfo.data)
    setLoading(false)
  }

  useEffect(() => {
    getCountryData(name)
  },[])

  // console.log("countryInfo", countryInfo)
  // console.log("weatherInfo", weatherInfo)

  //因为数据嵌套过深，显示前要判断是否已经修改了state
  if (!loading) {  
    return (
    <>
      <h1>{countryInfo.name.common}</h1>
      <div>capital {countryInfo.capital}</div>
      <div>population {countryInfo.population}</div>
      <h2>Spoken languages</h2>
      <ul>
       {Object.keys(countryInfo.languages).map((n, index) => 
        <li key={index+1}>{countryInfo.languages[n]}</li>
        )}
      </ul>
      <img src={countryInfo.flags.svg}></img>
      <h2>Weather in {countryInfo.capital}</h2>
      <div className='weatherinfo'>
        <h3>temperature:</h3><div className='info-font'>{weatherInfo.main.temp} Celcius</div>
      </div>
      <img src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}></img>
      <div className='weatherinfo'>
        <h3>wind:</h3><div className='info-font'>{weatherInfo.wind.speed} mph</div>
      </div>
    </>
  )
  }
}
