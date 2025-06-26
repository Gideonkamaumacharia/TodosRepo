import React from "react";
import TodoItem from "../components/TodoItem";
import { useTodos } from "../components/context/TodosContext";

export default function TodosInProgress() {
  const { todos } = useTodos();

  const inProgressTodos = todos.filter((todo) => !todo.completed);
  console.log("In Progress Todos: ", inProgressTodos);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-amber-700">Todos in Progress</h2>
      {inProgressTodos.length === 0 ? (
        <p className="text-gray-500 italic">No tasks in progress.</p>
      ) : (
        inProgressTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleUpdate={() => {}}
            handleDeleteTodo={() => {}}
          />
        ))
      )}
    </div>
  );
}
