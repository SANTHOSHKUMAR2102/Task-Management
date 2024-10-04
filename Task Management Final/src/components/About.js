import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">About Task Management System</h2>
      <p className="text-center">
        Welcome to the Task Management System! Our platform is designed to help you efficiently manage and organize your tasks. Whether you're a student, a professional, or someone looking to streamline your daily activities, our system offers a user-friendly interface to keep track of your tasks, deadlines, and priorities.
      </p>
      <p className="text-center">
        With features like task creation, editing, and deletion, you can easily manage your to-do list and stay on top of your responsibilities. Our system also allows you to categorize tasks, set deadlines, and mark tasks as complete to help you stay organized and focused.
      </p>
      <p className="text-center">
        We are committed to providing a simple and effective solution for task management. Thank you for choosing our system, and we hope it helps you achieve your goals and enhance productivity.
      </p>
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handleBackClick}>Back</button>
      </div>
    </div>
  );
};

export default About;
