import { useState } from 'react'

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

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }


  const filteredPersons = filter === '' ? persons: persons.filter(persons => persons.name.toLowerCase().includes(filter.toLowerCase()))
  const namesToShow = filteredPersons.map(person => (
          <p key={person.id}>{person.name} {person.number}</p>
        ))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={filter}
        onChange={handleFilter}
        />   
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName}
          onChange={handleNewName}
          />   
        </div>
        <div>
          number: <input value={newNumber}
          onChange={handleNewNumber}
          />   
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form >
      <h2>Numbers</h2>
      <div>
        {namesToShow}
      </div>
    </div>  

  )
}

export default App
