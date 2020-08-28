import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api");
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const todoList = todos.map((todo) => {
    return <li key={todo._id}>{todo.content}</li>;
  });

  return (
    <>
      <h2>TO-DO List</h2>
      {todos.length === 0 ? <p>Add your first to-do item</p> : <ul>{todoList}</ul>}
    </>
  );
}

export default App;
