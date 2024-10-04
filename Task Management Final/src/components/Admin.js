import React, { useEffect } from 'react';
import AddTask from './AddTask';
import ShowUser from './ShowUser';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(!sessionStorage.getItem("adminThere")){
      navigate("/");
    }
  }, [navigate])

  const handleLogout = () => {
    sessionStorage.removeItem("adminThere");
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <h3 className="navbar-brand">Task Management(Admin)</h3>
          <div className="d-flex">
            <a href="#" className="nav-link">ABOUT</a>
            <a href="/" className="nav-link" onClick={handleLogout}>LOGOUT</a>
          </div>
        </div>
      </nav>
      <AddTask />
      <ShowUser />
    </>
  )
}

export default Admin