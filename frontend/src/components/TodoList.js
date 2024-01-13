import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import { useTodoContext } from '../context/TodoContext';
import { useBackendContext } from '../context/BackendContext';
import { useAuthContext } from '../context/AuthContext';
import { Form } from 'react-bootstrap';

function TodoList() {
  const { todos, setTodos } = useTodoContext();
  const { api_base } = useBackendContext();
  const { currentUser } = useAuthContext();
  const [sortedTodos, setSortedTodos] = useState([...todos]);
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(true);

  const getTodos = async () => {
    const dummyTodos = [
      { _id: 1, text: 'dummy 1', isComplete: true, isImportant: true },
      { _id: 2, text: 'dummy 2', isComplete: false, isImportant: true },
      { _id: 3, text: 'dummy 3', isComplete: true, isImportant: false }
    ]
    try {
      const response = await fetch(`${api_base}/api/todos`, {
        headers: {
          'Authorization': `${currentUser.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Response not ok');
      }

      const fetchedTodos = await response.json();
      setTodos(fetchedTodos);
      // setTodos(dummyTodos);
    } catch (error) {
      console.error('Error while fetching todos from getTodos():', error);
    } finally {
      console.log('changing loading to false');
      setLoading(false); // Set loading to false regardless of success or error
    }
  };

  useEffect(() => {
    if (currentUser) {
      const delayFn = async () => {
        await getTodos();
      };
      delayFn();
    }
    // eslint-disable-next-line
  }, [currentUser]);

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

  if (loading) {
    return <p>Loading...</p>; // Display a loading message while fetching todos
  }

  // return (
  //   <div className="">
  //     <p>TodoList</p>
  //   </div>
  // )

  //eslint-disable-next-line
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
