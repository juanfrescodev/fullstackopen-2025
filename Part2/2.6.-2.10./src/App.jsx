import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm' 
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  
  const [newNumber, setNewNumber] = useState('') 

  const [filter, setFilter] = useState('')

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
      id: persons.length + 1,
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
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
