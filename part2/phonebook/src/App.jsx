import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonFrom from './PersonForm'
import Persons from './Persons'
import personService from "./services/persons"
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas1', number: '040-1234569', id: 1 },
    { name: 'Ada Lovelace1', number: '39-44-53235239', id: 2 },
    { name: 'Dan Abramov1', number: '12-43-2343459', id: 3 },
    { name: 'Mary Poppendieck1', number: '39-23-64231229', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll('http://localhost:3001/persons').then(response => {
    const newpersons = response.data
    setPersons(newpersons)
  })
  }, [])

  const Notification = ({message}) => {
    if (message === null) {
      return null
    }

    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter filter={filter} setFilter={setFilter} setShowFilter={setShowFilter} />
      <h3>Add a new</h3>
      <PersonFrom newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons} setErrorMessage={setErrorMessage} />
      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons} showFilter={showFilter} filter={filter} />
    </div>
  )
}

export default App