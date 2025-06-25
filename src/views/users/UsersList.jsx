import { useEffect, useState } from "react";
import UserCard from "../../components/users/UserCard.jsx";




const url = "https://jsonplaceholder.typicode.com/users";
const UsersList = () => {
    // UseState is a React hook that allows you to add state to functional components.
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() =>{
        async function getData() {
            setIsLoading(true);
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    setError("Failed To Fetch The data")
                    throw new Error(`Response status: ${response.status}`);
                }

                const json = await response.json();
                setUsers(json)
                console.log("Users: ", json);

                setIsLoading(false);
            } catch (error) {
                console.error(error.message);
            }finally{
                setIsLoading(false);
            }
        }

        getData();
    },[])



    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold text-center my-5">Users List</h1>
            {isLoading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div className="my-5 w-full">
                    <div className="grid grid-cols-1 mx-10 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {users.map(user => (
                            <UserCard key={user.id} user={user} />
                        ))}
                    </div>
                </div>
            )}


            {error && <p className="text-center text-red-500">{error}</p>}
        </div>
    );
};

export default UsersList;
