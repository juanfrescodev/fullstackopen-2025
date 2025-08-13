const Persons = ({ persons, borrar }) => {
  return (
    <div>
      {persons.map(person => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => borrar(person.id)}>delete</button>
        </li>
      ))}
    </div>
  )
}

export default Persons