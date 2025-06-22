import React, { useEffect, useRef, useState } from 'react'
import clearIcon from './assets/clear_icon.webp'
import cloudIcon from './assets/cloud_icon.webp'
import drizzleIcon from './assets/drizzle_icon.png'
import rainIcon from './assets/rain_icon.webp'
import snowIcon from './assets/snow_icon.webp'
import windSpeed from './assets/wind_speed.png'
import humidity from './assets/humidity.png'

function Weather() {

  const ref = useRef()
  const [weatherData, setWeatherData] = useState(false)
  
  const allIcons = {
    "01d" : clearIcon,
    "01n" : clearIcon,
    "02d" : cloudIcon,
    "02n" : cloudIcon,
    "03d" : cloudIcon,
    "03n" : cloudIcon,
    "04d" : drizzleIcon,
    "04n" : drizzleIcon,
    "09d" : rainIcon,
    "09n" : rainIcon,
    "10d" : rainIcon,
    "10n" : rainIcon,
    "13d" : snowIcon,
    "13n" : snowIcon,
  }

  
  const search = async (city) => {

    if(city.trim() == ""){
      alert("Please Enter City name")
      return;
    }

    try {
      const apiKey = import.meta.env.VITE_APP_ID
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      const response = await fetch(url)
      const data = await response.json()

      if(!response.ok){
        alert(data.message)
        setWeatherData(false)
        return;
      }

      console.log(data)
      const icon = allIcons[data.weather[0].icon] || clearIcon
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temp: data.main.temp,
        location: data.name,
        icon: icon
      })
    } catch(error) {
      setWeatherData(false)
      console.log("Data not fetched")
    }
  }

  useEffect(()=>{
    search("Chennai")
  },[])


    /* useEffect(()=>{
      const apiKey = import.meta.env.VITE_APP_ID
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
      .then(data => data.json())
      .then(data => {setWeatherData(data)})
      .catch(err => console.log(err))
    },[city]) */



  return ( 
    <div className='weather d-flex flex-column align-items-center'>
        <div className="search-bar d-flex align-items-center">
            <input ref={ref} type='text' placeholder='search' className='search-input'></input>
            <i className="bi bi-search mx-2 search-icon" onClick={()=>search(ref.current.value)}></i>
        </div>
        {weatherData && (
          <>
        <img src={weatherData.icon} alt='clear' className='weather-icon flex-column'></img>
        <b className='text-white display-5 1h-base fw-bold'>{weatherData.temp}°c</b>
        <p className='text-white fs-4 fw-bold'>{weatherData.location}</p>
        <div className='weather-data d-flex justify-content-space-between'>
          <div className='col'>
            <img src={humidity}></img>
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className='col'>
            <img src={windSpeed}></img>
            <div>
              <p>{weatherData.windSpeed} km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
        </>
        )}
    </div>
  )
}

export default Weather