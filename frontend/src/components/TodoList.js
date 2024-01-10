import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import { useTodoContext } from '../context/TodoContext';
import { useBackendContext } from '../context/BackendContext';
import { Form } from 'react-bootstrap';

function TodoList() {
  const { todos, setTodos } = useTodoContext();
  const { api_base } = useBackendContext();
  const [sortedTodos, setSortedTodos] = useState([...todos]);
  const [sortOption, setSortOption] = useState('');

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

  useEffect(() => {
    if (sortOption) {
      const sorted = [...todos].sort((a, b) => {
        switch (sortOption) {
          case 'name':
            return a.text.localeCompare(b.text);
          case 'importance':
            return a.isImportant ? -1 : 1;
          case 'completed':
            return a.isComplete ? 1 : -1;
          default:
            return 0;
        }
      });

      setSortedTodos(sorted);
    } else {
      setSortedTodos([...todos]);
    }
  }, [todos, sortOption]);

  const handleSort = (option) => {
    setSortOption(option);
  };

  return (
    <div>
      {/* Use Form.Select for sorting options with the w-auto class */}
      <Form.Select
        value={sortOption}
        onChange={(e) => handleSort(e.target.value)}
        className="w-auto"
      >
        <option value="">Select an option</option>
        <option value="name">Name</option>
        <option value="importance">Importance</option>
        <option value="completed">Completed</option>
        {/* Add more options for other sorting criteria */}
      </Form.Select>

      {sortedTodos.map((todo) => (
        <Todo key={todo._id} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
