// TaskList.js
import React from 'react';
import Task from './Task';

function TaskList({ tasks, toggleTask, deleteTask }) {
  return (
    <div>
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          toggleTask={() => toggleTask(index)}
          deleteTask={() => deleteTask(index)}
        />
      ))}
    </div>
  );
}

export default TaskList;
