import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const UserPage = () => {
  const [user, setUser] = useState(null);  
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const userThere = sessionStorage.getItem("userThere");
    if (!userThere) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/currentUser/tasks')
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user && user.length > 0) { 
      const currentUser = user[0];
      if (currentUser && currentUser.rollNumber) {
        axios.get(`http://localhost:8080/api/currentUser/tasks/${currentUser.rollNumber}`)
          .then(response => {
            setTasks(response.data);
          })
          .catch(error => {
            console.error("Error fetching tasks:", error);
          });
      } else {
        console.log('Roll Number is not available');
      }
    } else {
      console.log('User data is not available');
    }
  }, [user]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  const processHandle = (id) => {
    axios.put(`http://localhost:8080/api/currentUser/tasks/process/${id}`, { process: true })
      .then(response => {
        setTasks(tasks.map(task => 
          task.id === id ? { ...task, process: true } : task
        ));
      })
      .catch(error => {
        console.error("Error updating task:", error);
      });
  };

  const completedHandle = (id) => {
    axios.put(`http://localhost:8080/api/currentUser/tasks/completed/${id}`, { completed: true })
      .then(response => {
        setTasks(tasks.map(task => 
          task.id === id ? { ...task, completed: true } : task
        ));
      })
      .catch(error => {
        console.error("Error updating task:", error);
      });
  };

  const handleLogOut = () => {
    axios.delete('http://localhost:8080/api/logout')
      .then(response => {
        window.location.href = '/userLogin';
      })
      .catch(error => {
        console.error("Error during logout:", error);
      });
  };

  const hasTasks = tasks.some(task => !task.completed && !task.process);
  const hasProcessTasks = tasks.some(task => !task.completed && task.process);
  const hasCompletedTasks = tasks.some(task => task.completed && task.process);
  
  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <h3 className="navbar-brand">Task Management</h3>
          <div className="d-flex">
            <a href="/about" className="nav-link">ABOUT</a>
            <a href="#" className="nav-link" onClick={handleLogOut}>LOGOUT</a>
          </div>
        </div>
      </nav>

      <div className="row ml-5 mr-5">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Pending Tasks</h5>
            </div>
            <div className="card-body">
              {hasTasks ? (
                <ul className="list-group list-group-flush">
                  {tasks.map(task => (
                    !task.completed && !task.process && (
                      <li className="list-group-item d-flex justify-content-between align-items-center" key={task.id}>
                        {task.description} - {task.taskDate}
                        <button className="btn btn-sm btn-outline-primary" onClick={() => processHandle(task.id)}>Start</button>
                      </li>
                    )
                  ))}
                </ul>
              ) : (
                <p className="text-center m-3">No Tasks!!</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-header bg-warning text-dark">
              <h5 className=" mb-0">Processing Tasks</h5>
            </div>
            <div className="card-body">
              {hasProcessTasks ? (
                <ul className="list-group list-group-flush">
                  {tasks.map(task => (
                    !task.completed && task.process && (
                      <li className="list-group-item d-flex justify-content-between align-items-center" key={task.id}>
                        {task.description} - {task.taskDate}
                        <button className="btn btn-sm btn-outline-success" onClick={() => completedHandle(task.id)}>Completed</button>
                      </li>
                    )
                  ))}
                </ul>
              ) : (
                <p className="text-center m-3">No Processing Tasks!!</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h5 className=" mb-0">Completed Tasks</h5>
            </div>
            <div className="card-body">
              {hasCompletedTasks ? (
                <ul className="list-group list-group-flush">
                  {tasks.map(task => (
                    task.completed && task.process && (
                      <li className="list-group-item" key={task.id}>
                        {task.description} - {task.taskDate}
                      </li>
                    )
                  ))}
                </ul>
              ) : (
                <p className="text-center m-3">No Completed Tasks!!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
