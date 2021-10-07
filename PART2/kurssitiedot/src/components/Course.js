import React from 'react'

const Course = (props) => {
    return (
      <div>
        <Header course={props.name}/>
        <Content parts ={props.parts}/>
        <Total parts ={props.parts}/>
      </div>
    )
  }
const Header = function(props) {
  return(
  <>
  <h1>{props.course}</h1>
  </>
  );
}
const Content = function(props){
  //console.log(props);
  return(
    <ul>
      {props.parts.map((part, i) =>
      <Part key = {i} name = {part.name} exercises = {part.exercises} />
      )}
    </ul>
  )
}
const Part = function({keyeye, name, exercises}){
  //console.log(keyeye)
  return(<li>{name} {exercises}</li>);
}

const Total = function(props){
  //let sum = 0;
  //props.parts.forEach(element => sum += element.exercises);
  const sum = props.parts.reduce((a,b) =>{
    let x = a
    let y = b.exercises
    console.log(x,y)
    return x+y    
  },0)
  console.log(sum)
  return(<p>Number of exercises {sum}</p>);
}

export default Course