import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [paises, setPaises] = useState([])
  const [filteredPaises, setFilteredPaises] = useState([])

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
  }, [value,paises])


  const lista = () =>{
    const len = filteredPaises.length

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
          <li key = {index}> {pais.name.common}</li>
        ))
        }
      </ul> )
    }

    if (len === 1){
      const pais = filteredPaises[0]
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
        </div>
      )
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