// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');

    const fetchTasks = async () => {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL);
        setTasks(response.data);
    };

    const addTask = async () => {
        if (!taskTitle) return;
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL, { title: taskTitle });
        setTasks([...tasks, response.data]);
        setTaskTitle('');
    };

    const deleteTask = async (id) => {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/${id}`);
        setTasks(tasks.filter(task => task.id !== id));
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="App">
            <h1>Task Manager</h1>
            <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="New task title"
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title}
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
