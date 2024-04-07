const express = require("express");
const {
  getTodoByUser,
  createTodo,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
} = require("../controllers/todoController");

const router = express.Router();

router.get("/getTodos/:username", getTodoByUser);
router.post("/createTodo", createTodo);
router.put("/updateTodo/:todoId", updateTodo);
router.put("/updateTodoStatus/:todoId", updateTodoStatus);
router.delete("/deleteTodo/:todoId", deleteTodo);

module.exports = router;
