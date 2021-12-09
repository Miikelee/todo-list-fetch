import React, { useState, useEffect } from 'react';
import './App.css';


function App() {

  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  const handleChange = (evento) => {
    setInput(evento.target.value);
  }

  //Read task
  useEffect(() =>{
    ReadData()},[]);

const ReadData = () => {
        fetch("https://assets.breatheco.de/apis/fake/todos/user/mikelee",{
            method: "GET",
            headers: {
                "Content-type":"application/json"
            },
        })
            .then((res) => {
                return res.json()
            })
            .then(data => setTodos(data))
            .catch(error => console.log(error))
}

  const addTodo = (evento) => {
    evento.preventDefault();
    setTodos([...todos, { label: '' + input + ' ', done: false }]);
    console.log(todos);
    fetch("https://assets.breatheco.de/apis/fake/todos/user/mikelee", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([...todos, { label: '' + input + ' ', done: false }])
    }).then((res) => {
      console.log(res);
      return res.json()
    }).then(
      data => console.log(data)
    ).catch(
      error => console.log(error)
    );

    setInput('');
  }

  const deleteElement = (i) => {
    setTodos(todos.filter((numero, indice) => indice !== i));
    fetch("https://assets.breatheco.de/apis/fake/todos/user/mikelee", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todos.filter((numero, indice) => indice !== i))
    }).then((res) => {
      console.log(res);
      return res.json()
    }).then(
      data => console.log(data)
    ).catch(
      error => console.log(error)
    );
  }

  //En Caso de querer borrar usuario y toda la lista de tareas
   /* const deleteList = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/mikelee", {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then((res) => {
      console.log(res);
      return res.json()
    }).then(
      data => console.log(data)
    ).catch(
      error => console.log(error)
    );

  } */

  return (
    <div className="todo-app">
      <h1>TODO LIST </h1>
      <form className="todo-form" onSubmit={addTodo} >
        <input type="text" className="todo-input" required placeholder="Write a todo" onChange={handleChange} value={input} type="text" />
        <button className="todo-button" type="submit" id="button-addon2">Add todo</button>
      </form>

      <ul>
        {todos.map((todo, index) =>
          <li className="todo-row" key={index}>{todo.label}

            <i className="far fa-window-close icons" onClick={() => {
              deleteElement(index);
            }}>
            </i>
          </li>)
        }
      </ul>
    </div>
  );
}

export default App;
