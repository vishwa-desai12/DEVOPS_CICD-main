// backend/routes/tasks.js
const express = require('express');
const router = express.Router();

// In-memory tasks array
let tasks = [];

// Get all tasks
router.get('/', (req, res) => {
    res.json(tasks);
});

// Create a new task
router.post('/', (req, res) => {
    const { title } = req.body;
    const newTask = { id: tasks.length + 1, title };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Delete a task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== parseInt(id));
    res.status(204).send();
});

module.exports = router;
