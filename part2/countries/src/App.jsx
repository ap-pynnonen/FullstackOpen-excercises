import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'

const App = () => {

  const [isLoading, setLoading] = useState(true)
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState({})
  const [searchValue, setSearchValue] = useState(null)

  useEffect(() => {
    if (searchValue) {
      axios.
        get(`https://studies.cs.helsinki.fi/restcountries/api/all`).
          then(response => {
            const filteredCountries = response.data.filter(country => country.name.common.toLowerCase().includes(searchValue.toLowerCase()) === true)
            setCountries(filteredCountries)
            //console.log(filteredCountries)
            setLoading(false)
      })
    }
  }, [searchValue])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setSearchValue(value)
  }

  const ShowCountries = (props) => {
    
    const ShowCountry = (props) => {
      //console.log(props)
      const filtercountry = countries.filter(country => country.name.common.toLowerCase().includes(props.toLowerCase()) === true)
      setCountries(filtercountry)
    }

    if (!isLoading && props.countries && props.countries.length > 10) {
      return(
        <div>
            <p>too many countries</p>
        </div>
      )
    }
    else if (!isLoading && props.countries && props.countries.length < 11 && props.countries.length > 1) {
      return(
        <div>
            {props.countries.map(country => 
              <p key={country.name.common}>{country.name.common} <button onClick={() => ShowCountry(country.name.common)}>show</button></p>
            )}
        </div>
      )
    }
    else if (!isLoading && props.countries && props.countries.length < 2) {
      return(
        <div>
            {props.countries.map(country => 
              <div key={country.name.common}>
                <h1 >{country.name.common}</h1>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>
                <b>languages:</b>
                <ul>
                {Object.entries(country.languages).map(([key, value]) => (
                  <li key={key}>{value}</li>
                ))}
                 </ul>
                 <img src={country.flags.png} />
              </div>
            )}
        </div>
      )
    }
    else{
      return(
        null
      )
    }
  }

  return (
    <div>
      <form onSubmit={onSearch} >
        find countries <input value={value} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      <div>
        <ShowCountries countries={countries} />
      </div>
    </div>
  )
}

export default App