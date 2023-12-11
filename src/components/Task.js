// Task.js
import React from 'react';

function Task({ task, toggleTask, deleteTask }) {
  return (
    <div>
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </span>
      <button onClick={toggleTask}>Complete</button>
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
}

export default Task;