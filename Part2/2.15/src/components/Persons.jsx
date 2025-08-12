const Persons = ({ persons, borrar }) => {
  return (
    <div>
      {persons.map(person => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => borrar(person.id)}>delete</button>
        </p>
      ))}
    </div>
  )
}

export default Persons