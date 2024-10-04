import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

const UserLogin = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username:'',
    password:''
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/task')
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      console.error("errrorrr!!", error);
    })
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if(!formData.username){
      newErrors.username = "Username is Required";
    }
    if(!formData.password){
      newErrors.password = "Password is Required";  
    }
    setErrors(newErrors);

    if(Object.keys(newErrors).length === 0){
      const user = users.find(user => user.username === formData.username && user.password === formData.password)
      if(!user){
        newErrors.credentials = "Username or Password is wrong"
        setErrors(newErrors);
      } else {
        axios.post('http://localhost:8080/api/currentUser', {
          username: formData.username,
          rollNumber: user.rollNumber
        })
        .then(response => {
          alert("Login successful!");
          setFormData({
            username: '',
            password: ''
          });
          sessionStorage.setItem("userThere", 1);
          navigate('/userPage');
        })
        .catch(error => {
          console.log("error!!!!", error);
        });
      }
    }
  };
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <h3 className="navbar-brand pb-0">Task Management System</h3>
          <div className="navbar-nav ">
            <p className="nav-item">
              <Link to={'/'} className="nav-link">HOME</Link>
            </p>
            <p className="nav-item">
              <Link to={'/about'} className="nav-link">ABOUT</Link>
            </p>
          </div>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <h3 className="text-center mb-4">User Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="username">Username:</label>
                <input 
                  type="text" 
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.username && <p className="text-danger">{errors.username}</p>}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password">Password:</label>
                <input 
                  type="password" 
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.password && <p className="text-danger">{errors.password}</p>}
              </div>

              {errors.credentials && <p className="text-danger text-center">{errors.credentials}</p>}
              
              <button type='submit' className="btn btn-primary w-100">Log In</button>
              <p className="mt-3 text-center">I have't an account - <Link to="/signUp">Go To Registration Page</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
