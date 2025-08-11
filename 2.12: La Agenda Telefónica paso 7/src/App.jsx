import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm' 
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('') 

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then((response) => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')

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
    }
      axios
        .post('http://localhost:3001/persons', nameObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response.data))
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
