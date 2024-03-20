import { useState } from 'react'

const Statistics = (props) => {
  const increaseGood = () => {
    const newgood = props.good + 1;
    props.setGood(newgood);
  }
  
  const increaseNeutral = () => {
    const newnetral = props.neutral + 1;
    props.setNeutral(newnetral);
  }
  
  const increaseBad = () => {
    const newbad = props.bad + 1;
    props.setBad(newbad);
  }

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

  const StatisticLine = (props) => {
    if (props.text == "positive") {
      return (
        <tr>
          <td>{props.text}</td>
          <td>{props.value} %</td>
        </tr>
      )
    }
    else {
      return (
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      )
    }
  }

if (props.good == 0 && props.neutral == 0 && props.bad == 0) {
return (
  <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text="good" />
      <Button handleClick={increaseNeutral} text="neutral" />
      <Button handleClick={increaseBad} text="bad" />

      <h1>statistics</h1>
      <p>No feedback given</p>
  </div>
  )
}
else {
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text="good" />
      <Button handleClick={increaseNeutral} text="neutral" />
      <Button handleClick={increaseBad} text="bad" />

      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.good+props.neutral+props.bad} />
          <StatisticLine text="average" value={((props.good*1)+(props.neutral*0)+(props.bad*-1))/(props.good+props.neutral+props.bad)} />
          <StatisticLine text="positive" value={(props.good/(props.good+props.neutral+props.bad)*100)} />
        </tbody>
      </table>
    </div>
  )
}

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
    <div>
      <Statistics good={good} setGood={setGood} neutral={neutral} setNeutral={setNeutral} bad={bad} setBad={setBad} />
    </div>
  )
}

export default App
