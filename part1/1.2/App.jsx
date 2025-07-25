const Part = (props) => {
  return(
    <p>{props.nombre} {props.ejercicios}</p>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
}

const Content = (props) =>{
  return(
  <div>
    <Part nombre={props.parte1} ejercicios={props.ejercicios1}/>
    <Part nombre={props.parte2} ejercicios={props.ejercicios2}/>
    <Part nombre={props.parte3} ejercicios={props.ejercicios3}/>
  </div>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.total} </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content
      parte1={part1} ejercicios1={exercises1} 
      parte2={part2} ejercicios2={exercises2}
      parte3={part3} ejercicios3={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3}/>

    </div>
  )
}

export default App