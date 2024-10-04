import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom'; 


const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '', credentials: '' });
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setErrors({ username: '', password: '', credentials: '' });

    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    console.log('Form submitted:', formData);
    if(formData.username === "admin" && formData.password === "admin123"){
      sessionStorage.setItem("adminThere", 1);
      navigate('/admin')
    }
    
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <h3 className="navbar-brand pb-0">Task Management System(Admin)</h3>
          <div className="navbar-nav ">
            <p className="nav-item">
              <Link to={'/about'} className="nav-link">ABOUT</Link>
            </p>
          </div>
        </div>
      </nav>
      <div className="container mt-5">
        
        <div className="row justify-content-center">
          <div className="col-md-4">
            <h3 className="text-center mb-4">Admin Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="username">Username:</label>
                <input 
                  type="text" 
                  name='username'
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <p className="text-danger">{errors.username}</p>}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password">Password:</label>
                <input 
                  type="password" 
                  name='password'
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="text-danger">{errors.password}</p>}
              </div>

              {errors.credentials && <p className="text-danger text-center">{errors.credentials}</p>}
              
              <button type='submit' className="btn btn-primary w-100">Log In</button>
              <p className="mt-3 text-center">Don't have an account? - <Link to="/">Go To Home Page</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
