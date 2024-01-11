const express = require('express');

const router = express.Router();
const Todo = require('../models/todoModel');

const { requireAuth } = require('../middleware/requireAuth');

router.get('/', requireAuth, getAllTodos);

router.post('/', requireAuth, postTodo);

router.delete('/:id', requireAuth, deleteTodo);

router.put('/:id', requireAuth, updateTodo);

module.exports = router;