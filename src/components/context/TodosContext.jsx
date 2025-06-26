
import { createContext, useContext } from "react";

export const TodosContext = createContext(null);

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodosContext.Provider");
  }
  return context;
};
