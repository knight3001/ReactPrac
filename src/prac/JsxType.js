import React, { Component } from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}

function Greeting(props){
    return <div>First Name: {props.firstName}  Last Name: {props.lastName}</div>
}

function Spread() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}

function Item(props) {
  return <li>{props.message}</li>;
}

function TodoList() {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return (
    <ul>
      {todos.map((message) => <Item key={message} message={message} />)}
    </ul>
  );
}

// Calls the children callback numTimes to produce a repeated component
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <ul className="list-group">{items}</ul>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
    {(index) => <li className="list-group-item" key={index}>This is item {index} in the list</li>}
    </Repeat>
  );
}

class JsxType extends Component{
    render(){
        return (
        <div className="row">
            <ListOfTenThings />
        </div>
        );
    }
}

export default JsxType;