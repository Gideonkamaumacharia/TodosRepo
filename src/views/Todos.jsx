import {useState, useEffect} from "react";
import {Outlet} from "react-router-dom";
import TodosNav from "../navbar/TodosNav.jsx";
import { TodosContext } from "../components/context/TodosContext"; 



const url = "https://jsonplaceholder.typicode.com/todos";
export default function Todos() {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() =>{
        async function getData() {

            setIsLoading(true);
            try {
                const response = await fetch(url);
                console.log(response);

                if (!response.ok) {
                    setError("Failed To Fetch The data")
                    throw new Error(`Response status: ${response.status}`);
                }

                const json = await response.json();


                setTodos(json.slice(0, 10).map(todo => ({
                    id: todo.id,
                    todoName: todo.title,
                    completed: todo.completed,
                })));

                

                setIsLoading(false);
            } catch (error) {
                console.error(error.message);
            }finally{
                setIsLoading(false);
            }
        }

        getData();
    },[])

    useEffect(() => {
        console.log("Fetched Todos:",todos);
    });


    return (
    <TodosContext value={{ todos, isLoading, error }}>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">Todos Page</h1>

        <TodosNav />

        <div className="bg-amber-300 p-10 w-full">
          <Outlet />
        </div>

        {isLoading && (
          <p className="text-center text-gray-500 mt-4">Loading...</p>
        )}

        {error && (
          <p className="text-center text-red-500 mt-4">{error}</p>
        )}
      </div>
    </TodosContext>
  );
}