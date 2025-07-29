import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = (props) => (
  <div>
    <table>
      <tbody>
        <StatisticsLine text="Good" value={props.good} />
        <StatisticsLine text="Neutral" value={props.neutral}/>
        <StatisticsLine text="Bad" value={props.bad}/>
        <StatisticsLine text="All" value={props.total}/>
        <StatisticsLine text="Average" value= {props.average}/>
        <StatisticsLine text="Positive" value={props.positive*100 + "%"}/>
      </tbody>
    </table>
  </div>
)

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)
  const total = good+neutral+bad
  const valor = good*1 + neutral *0 + bad *-1
  const average = valor/total
  const positive = good/total

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  let stats
  if (total !== 0){
    stats = (
        <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
        />
    )
  }
  else {
    stats = <p>No Feedback given</p>
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      
      <Button
        onClick={increaseGood}
        text='Good'
      />
      
      <Button
        onClick={increaseNeutral}
        text='Neutral'
      />    
      
      <Button
        onClick={increaseBad}
        text='Bad'
      />
      <h2>Statistics</h2>
      
      {stats}
      

    </div>
  )
}

export default App