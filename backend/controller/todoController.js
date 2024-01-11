const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error while fetching todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const postTodo = async (req, res) => {
  try {
    const { text, description, isImportant, dueDate } = req.body;

    const newTodo = new Todo({
      text,
      description,
      isImportant: isImportant || false,
      isComplete: false,
      dueDate
    });

    const savedTodo = await newTodo.save();

    res.status(201).json(savedTodo);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const targetTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!targetTodo) {
      // No todo found with the specified id
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Todo successfully deleted
    res.status(200).json(targetTodo);
  } catch (error) {
    res.status(500).json({ error: 'Error while deleting a todo' });
  }
};

const updateTodo = async (req, res) => {
  try {
    console.log(req.body);
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedTodo) {
      // No todo found with the specified id
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Todo successfully updated
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Error while updating a todo' });
  }
};