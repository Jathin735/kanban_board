const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.params.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { title, description, assignedTo } = req.body;
        const task = new Task({ title, description, assignedTo });
        await task.save();
        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error creating task' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: 'Error updating task' });
    }
};
