import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    rollNumber: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const errors = {};
    
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) errors.password = "Password must be at least 8 characters long";
    if (!hasUppercase) errors.password = "Password must contain at least one uppercase letter";
    if (!hasLowercase) errors.password = "Password must contain at least one lowercase letter";
    if (!hasDigit) errors.password = "Password must contain at least one digit";
    if (!hasSpecialChar) errors.password = "Password must contain at least one special character";

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is Required";
    if (!formData.email) newErrors.email = "Email is Required";
    if (!formData.rollNumber) newErrors.rollNumber = "Roll Number is Required";
    if (!formData.password) newErrors.password = "Password is Required";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    const passwordErrors = validatePassword(formData.password);
    if (Object.keys(passwordErrors).length > 0) {
      newErrors.password = passwordErrors.password;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      axios.post('http://localhost:8080/api/user', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        rollNumber: formData.rollNumber
      })
      .then(response => {
        alert("User Registered Successfully!!");
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          rollNumber: ''
        });
        navigate('/userLogin');
      })
      .catch(error => {
        console.log("Something went wrong!", error);
      });
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <h3 className="navbar-brand pb-0">Task Management System</h3>
          <div className="navbar-nav">
            <p className="nav-item">
              <Link to={'/'} className="nav-link">HOME</Link>
            </p>
            <p className="nav-item">
              <Link to={'/about'} className="nav-link">ABOUT</Link>
            </p>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <h2 className="text-center mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="username">Username:</label>
                <input 
                  type="text" 
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.username && <p className="text-danger">{errors.username}</p>}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="email">Email:</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="rollNumber">Roll Number:</label>
                <input 
                  type="number" 
                  id="rollNumber"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.rollNumber && <p className="text-danger">{errors.rollNumber}</p>}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password">Password:</label>
                <input 
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.password && <p className="text-danger">{errors.password}</p>}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input 
                  type="password" 
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
              </div>

              <button type="submit" className="btn btn-primary w-100">Sign Up</button>
              <p className="mt-3 text-center">I already have an account - <Link to="/userLogin">Go To Login</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
