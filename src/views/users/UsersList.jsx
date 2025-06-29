import { useEffect, useState } from "react";
import UserCard from "../../components/users/UserCard.jsx";
import { useSearchParams } from "react-router-dom";




const url = "https://jsonplaceholder.typicode.com/users";
const UsersList = () => {
    // UseState is a React hook that allows you to add state to functional components.
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchParams,setSearchParams] = useSearchParams();
    const search = searchParams.get('search') || ""

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
                //console.log("Users: ", json);

                setIsLoading(false);
            } catch (error) {
                console.error(error.message);
            }finally{
                setIsLoading(false);
            }
        }

        getData();
    },[])

    function handleSearchChange(e){
        e.preventDefault()
        const query = e.target.value
        setSearchParams({search:query})
    }

    const filteredUsers = 
        users.filter(user => (
           user?.name?.toLowerCase().includes(search.toLowerCase()) 
        ))

    console.log("Users: ",filteredUsers)


    return (
        <div className="w-full">
            <div>
                <input
                    type="text"
                    placeholder="search.."
                    value={search}
                    onChange={handleSearchChange}
                    className="border p-2"
                />
                <button onClick={() =>setSearchParams({})}  className="px-4 py-2 bg-gray-200 ml-4 rounded">
                    Clear
                </button>

            </div>
            <h1 className="text-3xl font-bold text-center my-5">Users List</h1>
            {isLoading ? (
                <p className="text-center text-gray-500">Loading...</p>
            )  : filteredUsers.length === 0 ? (
                <p className="text-center text-gray-500">
                    No user matches the search 
                </p>
            ):(
                <div className="my-5 w-full">
                    <div className="grid grid-cols-1 mx-10 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredUsers.map(user => (
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
