import React from "react";
import TodoItem from "../components/TodoItem";
import { useTodos } from "../components/context/TodosContext";

export default function CompletedTodos() {
  const { todos } = useTodos();

  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-amber-700">Completed Todos</h2>
      {completedTodos.length === 0 ? (
        <p className="text-gray-500 italic">No completed tasks.</p>
      ) : (
        completedTodos.map((todo) => (
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
