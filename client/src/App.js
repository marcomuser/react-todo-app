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

  const handleCheckbox = async () => {
    console.log("checked");
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
        <input type="checkbox" onClick={handleCheckbox} />
        <p>{todo.content}</p>
        <button onClick={() => handleDelete(todo._id)}>Delete</button>
      </div>
    );
  });

  return (
    <>
      <h2>TO-DO List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formInput}
          onChange={(event) => setFormInput(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {isError && <p>Something went wrong...</p>}
      {isLoading ? <p>Loading...</p> : <div>{todoList}</div>}
    </>
  );
}

export default App;
