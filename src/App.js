import React, { useState, useEffect } from 'react';
import './App.css'; 
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

function App() {
  const [tasks, setTasks] = useState([]);

  const loadTasksFromServer = async () => {
    try {
      const response = await fetch('http://localhost:3001/loadTasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const tasks = await response.json();
      setTasks(tasks);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const saveTasksToServer = async (tasks) => {
    try {
      const response = await fetch('http://localhost:3001/saveTasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tasks),
      });
      if (!response.ok) {
        throw new Error('Failed to save tasks');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  useEffect(() => {
    loadTasksFromServer();
  }, []);
  
  useEffect(() => {
    if (tasks.length > 0) {
      saveTasksToServer(tasks);
    }
  }, [tasks]);
  
  
  const addTask = task => {
    setTasks([...tasks, { text: task, completed: false }]);
  };

  const toggleTask = index => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = index => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <div className="App-container">
        <h1>Tasks</h1>
        <AddTask addTask={addTask} />
        <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
      </div>
    </div>
  );
}

export default App;
