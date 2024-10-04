import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import homeImage from '../assets/homeImage.jpg';

const Home = () => {
  

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <h3 className="navbar-brand pb-0">Task Management System</h3>
          <div className="navbar-nav">
            <Link to='/adminLogin' className="nav-link">ADMIN</Link>
            <Link to='/about' className="nav-link">ABOUT</Link>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          <div className="col-md-7 d-flex align-items-center">
            <img src={homeImage} alt="home" className="img-fluid w-100" />
          </div>
          <div className="col-md-5 mt-5 p-5">
            <h3 className="mb-4">"Your Personal Task Assistant!"</h3>
            <Link to="/signUp" className="btn btn-primary text-white text-decoration-none">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
