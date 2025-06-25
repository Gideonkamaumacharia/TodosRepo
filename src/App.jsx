import Navbar from "./navbar/Navbar";
import TodoListApp from "./views/TodoListApp";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PageNotFound from "./views/PageNotFound.jsx";
import Todos from "./views/Todos.jsx";
import CompletedTodos from "./views/CompletedTodos.jsx";
import TodosInProgress from "./views/TodosInProgress.jsx";
import UsersList from "./views/users/UsersList.jsx";
import User from "./views/users/User.jsx";

const App = () => {
  return (
        <BrowserRouter>
              <Navbar />
              <div className="w-1/2 mx-auto my-10">

                  <Routes>
                      <Route path="/" element={<TodoListApp />}/>

                      <Route path="/todo" element={<Todos />}>
                          <Route index element={<CompletedTodos/>} />
                          <Route path="inProgress" element={<TodosInProgress/>} />
                          <Route path="completed" element={<CompletedTodos/>} />
                      </Route>


                      <Route path="/users" element={<UsersList />}>
                          {/* todo <Route path="*" element={<PageNotFound />} /> */}
                      </Route>
                      <Route path="/users/:id" element={<User />} />
                      <Route path="/about" element={<TodoListApp />}/>
                      <Route path="*" element={<PageNotFound/>}/>
                  </Routes>
              </div>

      </BrowserRouter>
  );
};

export default App;
