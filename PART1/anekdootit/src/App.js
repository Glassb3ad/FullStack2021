import React, { useState } from 'react'

const Popular = (props) =>{
  const max = props.points.indexOf(Math.max(...props.points))
  if(Math.max(...props.points)>0){
  return(
    <p>{props.anecs[max]}</p>
  )
  }
  else {return (<p>No votes yet</p>)}
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ] 
  const [selected, setSelected] = useState(0)
  let [points, setPoints] = useState(Array(7).fill(0))
  const vote = () => {
    let temp = [].concat(points)
    temp[selected] = temp[selected] +1;
    setPoints(temp);
  }
  return (
    <div>
      <h1> Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <button onClick ={() => setSelected(Math.floor(Math.random() * 6))}>new anecdote</button>
      <button onClick ={vote}>Vote</button>
      <br></br>
      <h1>Anecdote with most votes</h1>
      <Popular points = {points} anecs = {anecdotes}/>
      
    </div>
  )
}

export default App