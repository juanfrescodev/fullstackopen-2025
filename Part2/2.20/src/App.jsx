import { useState, useEffect } from 'react'
import axios from 'axios'

const PaisSeleccionado = ({pais, clima}) =>{
  return(
    <div>
      <h1>{pais.name.common}</h1>
      <p>Capital {pais.capital}</p>
      <p>Area {pais.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(pais.languages).map((lang, id)=>(
          <li key = {id}> {lang}</li>
          ))}
      </ul>
      <img src ={pais.flags.png} alt = {pais.flags.alt} />
      <h2> Weather in {pais.capital}</h2>
      {clima ? (
        <>
          <p>Temperature {clima.main.temp} °Celsius</p>
          <img src ={`https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`} alt = {clima.weather[0].description} />
          <p> Wind {clima.wind.speed} m/s</p>
        </>
      ): (
        <p>cargando...</p>
      )
      }
    </div>
  )
}

const App = () => {
  const [value, setValue] = useState('')
  const [paises, setPaises] = useState([])
  const [filteredPaises, setFilteredPaises] = useState([])
  const [selected, setSelected] = useState(null)
  const [clima, setClima] = useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setPaises(response.data)
        setFilteredPaises(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    const filtered = paises.filter(pais => 
      pais.name.common.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredPaises(filtered)
    if (filtered.length > 1){
      setSelected(null)
    }  
    if (filtered.length === 1){
      setSelected(filtered[0])
    }
  }, [value,paises])

  useEffect(() => {
    if(selected){
      setClima(null)
      const [lat,long] = selected.capitalInfo.latlng
      const api_key = import.meta.env.VITE_SOME_KEY
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}&units=metric`)
        .then(response => {
          setClima(response.data)
        })
    }
  }, [selected])

  const lista = () =>{
    const len = filteredPaises.length

    if (selected !== null){
      return <PaisSeleccionado pais={selected} clima={clima}/>
    }
    
    if (value === ''){
      return <p>Type a country to search</p>
    }

    if (len > 10) {
      return <p>Too many matches, specify another filter</p>
    }

    if (len > 1) {
      return(
        <ul>
         {filteredPaises.map((pais,index) => (
          <li key = {index}> {pais.name.common}
          <button onClick={() => setSelected(pais)}>Show</button></li>
        ))
        }
      </ul> )
    }
    return <p>No country matches the search</p>    
  }

  return (
    <div>
      <form>
        find countries: <input value={value} onChange={handleChange} />
      </form>
      {lista()}
    </div>
  )
}

export default App