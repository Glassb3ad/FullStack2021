
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SearchResult = (props) => {
  const countries = props.filteredCountries
  //console.log(countries.length)
  if(countries.length > 1 && countries.length < 11){
    const names = countries.map(country => country.name.common)
    return(
      <ul>
        {names.map((name, i) => {
          return <li key = {i}>{name} <button value ={name} onClick ={props.handleFilter}>show</button></li>
        })}
      </ul>
    )
  }
  if(countries.length === 1) {
    const country = countries[0]
    const languages = Object.entries(country.languages).map(a => a[1])
    return(
     <div>
       <h1>{country.name.common}</h1>
       <p>capital: {country.capital[0]}</p>
       <p>population: {country.population} </p>
       <h3>Languages</h3>
       <ul>
         {languages.map((a, i) => <li key={i}>{a}</li>)}
       </ul>
       <img src={country.flags.png} alt="Flag"/>
      </div>
      
    ) 
  }
  return <p>Too many search results. Narrow your search</p>
}

const GetWeather = (props) => {
  if(props.filteredCountries.length === 1 && props.weather != undefined && !(JSON.stringify(props.weather) === JSON.stringify({}))){
    const weather = props.weather
    console.log(weather)
    return(
    <div>    
	    <h3>Weather in {props.filteredCountries[0].capital[0]}</h3>
      <p><b>temperature:</b> {weather.current.temperature}</p>
    < img src={weather.current.weather_icons[0]} alt="weather symbol"/>
      <p><b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
    </div>
    )
  }
  else return <></>
}
function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setNewFilteredCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [weather, setWeather] = useState({})
  
  useEffect(() => {
    //console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        //console.log('promise fulfilled')
        //console.log(response.data)
        //console.log (typeof(response.data))
        setCountries(response.data)
        //console.log(countries)
        setNewFilteredCountries(response.data)
        //console.log(filteredCountries)
      })
  },[])

  const handleFilter = event => {
    const temp = countries.filter(a => a.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    setNewFilteredCountries(temp)
    setFilter(event.target.value)
    if(temp.length === 1){
      const capital = temp[0].capital[0]
      console.log(capital)
      const api_key = process.env.REACT_APP_API_KEY
      const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
      console.log(url)
      axios.get(url)
      .then(response =>{
        //console.log(response)
        if(response.data != undefined) setWeather(response.data)
        //console.log("response data 1" + response.data)
        //console.log("response data 1" + typeof(response.data))
        //console.log(weather)
      })
    }
    else setWeather({})
  }




  return (
    <div>
      <h1>Countries</h1>
      <div>Search for a country<input value={filter} onChange = {handleFilter}></input></div>
      <SearchResult filteredCountries = {filteredCountries} handleFilter={handleFilter}/>
      <GetWeather filteredCountries = {filteredCountries} weather={weather}/>
    </div>
  )

}

export default App;
