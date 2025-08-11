import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm' 
import Filter from './components/Filter'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('') 
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons=>{
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const addName = (event) =>{
    event.preventDefault()
    const nameExists = persons.some(person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())

    if (nameExists){
    alert(`${newName} is already added to phonebook`)
    return
    }
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const filteredPersons = filter === '' ? persons: persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value = {filter} onChange = {handleFilter} />
      <h2>Add a new</h2>
      <PersonForm 
        nombre = {newName}
        numero = {newNumber}
        changeNombre = {handleNewName}
        changeNumero = {handleNewNumber}
        onSubmit = {addName}/>
      
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>  

  )
}

export default App
