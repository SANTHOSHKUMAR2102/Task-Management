import React, { useState } from 'react';
import axios from 'axios';

const AddTask = () => {
  const [rollNo, setRollNo] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear any previous errors
    setError('');

    // Basic validation (optional)
    if (!rollNo || !taskDescription || !taskDate) {
      setError('Please fill in all fields.');
      return;
    }

    axios.post('http://localhost:8080/api/task', { rollNumber: rollNo, description: taskDescription, taskDate })
      .then(response => {
        alert('Task Added Successfully!!');
        setRollNo('');
        setTaskDescription('');
        setTaskDate('');
      })
      .catch(error => {
        console.log('Ooo Something Error!!', error);
        setError('Failed to add task. Please try again.');
      });
  };

  return (
    <div className="ml-4 mr-4 mt-4">
      <h3 className="mb-4">Add Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter the roll number" 
            
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter the Task" 
            
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <input 
            type="date" 
            className="form-control" 
            
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
