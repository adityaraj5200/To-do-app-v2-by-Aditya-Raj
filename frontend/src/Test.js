// TodoList.js backup

// TodoList.js backup

import React, { useEffect } from 'react';
import Todo from './Todo';
import { useTodoContext } from '../context/TodoContext';
import { useBackendContext } from '../context/BackendContext';


function TodoList() {
  const { todos, setTodos } = useTodoContext();
  const { api_base } = useBackendContext();

  const getTodos = async () => {
    try {
      const response = await fetch(`${api_base}/api/todos`);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const fetchedTodos = await response.json();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error('Error while fetching todos:', error);
    }
  };

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line
  }, []);


  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo._id} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
