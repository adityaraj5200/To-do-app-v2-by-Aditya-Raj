const express = require('express');

const router = express.Router();

const { getAllTodos, postTodo, deleteTodo, updateTodo } = require('../controller/todoController');

const { requireAuth } = require('../middleware/requireAuth');

router.use(requireAuth);

router.get('/', requireAuth, getAllTodos);

router.post('/', requireAuth, postTodo);

router.delete('/:id', requireAuth, deleteTodo);

router.put('/:id', requireAuth, updateTodo);

module.exports = router;