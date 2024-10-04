import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ShowUser = () => {
  const [users, setUsers] = useState([]);
  const [selectUser, setSelectUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/task')
      .then(response => {
        setUsers(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error("Error fetching users", error);
      });
  }, []);

  const handleUserClick = (user) => {
    setSelectUser(user);
  };

  useEffect(() => {
    if (selectUser) {
      axios.get(`http://localhost:8080/api/task/user/${selectUser.rollNumber}`)
        .then(response => {
          setTasks(response.data);
        })
        .catch(error => {
          console.error("Error fetching tasks", error);
        });
    }
  }, [selectUser]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/task/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
        alert("Task Deleted!!");
      })
      .catch(error => {
        console.error("Error deleting task", error);
      });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditSave = () => {
    axios.put(`http://localhost:8080/api/currentUser/tasks/edit/${editTask.id}`, editTask)
      .then(response => {
        setTasks(tasks.map(task => task.id === editTask.id ? response.data : task));
        setEditTask(null);
        alert("Task updated!");
      })
      .catch(error => {
        console.error("Error updating task", error);
      });
  };

  return (
    <div className="mt-4 ml-4 mr-5 row">
      <div className='col-md-4'>
        <h3 className="mb-4">User Details</h3>
      
        <div className=" mb-4">
          <ul className="list-group">
            {
              users.map(user => (
                <li
                  key={user.id}
                  className="list-group-item d-flex justify-content-between align-items-center cursor-pointer"
                  onClick={() => handleUserClick(user)}
                >
                  {user.username} - {user.rollNumber}
                </li>
              ))
            }
          </ul>
        </div>
      </div>

      {
        selectUser && (
          <div className='col-md-8'>
            <h4 className="mb-4">Tasks for {selectUser.username} ({selectUser.rollNumber})</h4>
            <ul className="list-group mb-4">
              {
                tasks.map(task => (
                  <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {task.id === editTask?.id ? (
                      <div className="d-flex w-100 align-items-center">
                        <div className="form-group mr-2">
                          <input
                            type="text"
                            name="description"
                            className="form-control"
                            value={editTask.description}
                            onChange={handleEditChange}
                          />
                        </div>
                        <div className="form-group mr-2">
                          <input
                            type="date"
                            name="taskDate"
                            className="form-control"
                            value={editTask.taskDate}
                            onChange={handleEditChange}
                          />
                        </div>
                        <button className="btn btn-primary" onClick={handleEditSave}>Save</button>
                      </div>
                    ) : (
                      <div className="d-flex w-100 justify-content-between align-items-center">
                        <span >
                          {task.description} - {task.taskDate} - <span style={{ color: task.completed ? 'green' : 'red', fontWeight: 'bold' }}>{task.completed ? 'Completed' : 'Not Completed'}</span>
                        </span>
                        <div>
                          <button className="btn btn-secondary btn-sm mr-2" onClick={() => setEditTask(task)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task.id)}>Delete</button>
                        </div>
                      </div>
                    )}
                  </li>
                ))
              }
            </ul>
          </div>
        )
      }
      
    </div>
  );
};

export default ShowUser;
