import React, { useEffect, useRef, useState } from 'react'

function Weather() {

  const ref = useRef()
  const [weatherData, setWeatherData] = useState(false)
  
  const allIcons = {
    "01d" : "src/assets/clear_icon.webp",
    "01n" : "src/assets/clear_icon.webp",
    "02d" : "src/assets/cloud_icon.webp",
    "02n" : "src/assets/cloud_icon.webp",
    "03d" : "src/assets/cloud_icon.webp",
    "03n" : "src/assets/cloud_icon.webp",
    "04d" : "src/assets/drizzle_icon.png",
    "04n" : "src/assets/drizzle_icon.png",
    "09d" : "src/assets/rain_icon.webp",
    "09n" : "src/assets/rain_icon.webp",
    "10d" : "src/assets/rain_icon.webp",
    "10n" : "src/assets/rain_icon.webp",
    "13d" : "src/assets/snow_icon.webp",
    "13n" : "src/assets/snow_icon.webp",
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
      const icon = allIcons[data.weather[0].icon] || "src/assets/clear_icon.webp"
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
            <img src='src/assets/humidity.png'></img>
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className='col'>
            <img src='src/assets/wind_speed.png'></img>
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