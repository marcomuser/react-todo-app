import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const todoList = todos.map((todo) => {
    return <li>{todo}</li>;
  });

  return (
    <div>
      <h2>TO-DO List</h2>
      <ul>
        {todos.length === 0 ? <p>Add your first to-do item</p> : todoList}
      </ul>
    </div>
  );
}

export default App;
