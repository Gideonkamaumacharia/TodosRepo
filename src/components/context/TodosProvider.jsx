// components/context/TodosProvider.jsx
import React, { useState, useEffect } from "react";
import { TodosContext } from "./TodosContext";

const url = "https://jsonplaceholder.typicode.com/todos";

export default function TodosProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setTodos(
          json.slice(0, 10).map((todo) => ({
            id: todo.id,
            todoName: todo.title,
            completed: todo.completed,
          }))
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  function handleUpdate(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleDeleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <TodosContext.Provider
      value={{ todos, isLoading, error, handleUpdate, handleDeleteTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
}
