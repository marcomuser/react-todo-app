import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formInput, setFormInput] = useState("");

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: formInput }),
      });
      const result = await response.json();
      setTodos((prevArr) => [...prevArr, result]);
      setFormInput("");
    } catch (err) {
      setIsError(true);
    }
  };

  const handleCheckbox = async (id) => {
    const index = todos.findIndex((todo) => todo._id === id);
    todos[index].completed = !todos[index].completed;
    await fetch(`/api/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todoStatus: todos[index].completed }),
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      const newList = todos.filter((todo) => todo._id !== data._id);
      setTodos(newList);
    } catch (err) {
      setIsError(true);
    }
  };

  const todoList = todos.map((todo) => {
    return (
      <div key={todo._id}>
        <input type="checkbox" onChange={() => handleCheckbox(todo._id)} defaultChecked={todo.completed ? "checked" : ""} />
        <p>{todo.content}</p>
        <button onClick={() => handleDelete(todo._id)}>Delete</button>
      </div>
    );
  });

  return (
    <>
      <h1>TO-DO List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formInput}
          onChange={(event) => setFormInput(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {isLoading ? <p>Loading...</p> : <div>{todoList}</div>}
      {isError && <p>Something went wrong. Try reloading the page!</p>}
    </>
  );
}

export default App;
