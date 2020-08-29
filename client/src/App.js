import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api");
        const data = await response.json();
        setTodos(data);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
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
      {isError && <p>Something went wrong...</p>}
      {isLoading ? <p>Loading...</p> : <ul>{todoList}</ul>}
    </>
  );
}

export default App;
