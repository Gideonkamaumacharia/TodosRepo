import React from "react";
import {Link} from "react-router-dom";

  const Navbar = ({ appTitle }) => {
    
   
    return (
      <div className="bg-gray-800 text-white text-lg flex justify-center gap-5 p-4">
        <p>{appTitle}</p>

          <Link to="/">Home</Link>
          <Link to="/todo">Todo</Link>
          <Link to="/users">Users</Link>
          <Link to="/about">About</Link>


      </div>
    );
  };

export default Navbar;


