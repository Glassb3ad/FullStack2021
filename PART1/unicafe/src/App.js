import React, { useState } from 'react'
const Button = (props) => {
  
  return(
    <>
    <button onClick = {props.set}>{props.text}</button>
    </>
  )
}
const Statistcline= (props) => {
  return(
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}
const Statistics = (props) => {
  const good = props.good
  const neutral =props.neutral
  const bad = props.bad
  if(good>0 || neutral > 0 || bad > 0){
    return(
    <>
    <h1>statistics</h1>
      <table>
        <tbody>
        <Statistcline value={good} text="good"/>
        <Statistcline value={neutral} text="neutral"/>
        <Statistcline value={bad} text="bad"/>
        <Statistcline value={good+neutral+bad} text="All"/>
        <Statistcline value={(good-bad)/(bad+good+neutral)} text="average"/>
        <Statistcline value={100*(good/(bad+good+neutral))} text="positive"/>
        </tbody>
      </table>
    </>)
  }
  else{
    return(
      <p>No feedback given</p>
    )
  }
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button set ={() => setGood(good+1)} text ="good"/>
      <Button set ={() => setNeutral(neutral+1)}  text ="neutral"/>
      <Button set ={() => setBad(bad+1)}  text ="bad"/> 
      <br></br>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App