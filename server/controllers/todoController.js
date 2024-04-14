const Todo = require('../models/todoModel');
const User = require('../models/userModel');

const getTodoByUser = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const todos = await Todo.find({ createdBy: user._id });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createTodo = async (req, res) => {
    try {
        const { text, username } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const todo = new Todo({
            text,
            status: "Pending",
            createdBy: user._id
        });

        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const { text } = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(todoId, { text }, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateTodoStatus = async (req, res) => {
    try {
        const { todoId } = req.params;
        const { status } = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(todoId, { status }, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}





const deleteTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        
        const deletedTodo = await Todo.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getTodoByUser,
    createTodo,
    updateTodo,
    updateTodoStatus,
    deleteTodo,
}
