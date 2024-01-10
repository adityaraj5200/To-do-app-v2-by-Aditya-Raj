import React, { createContext, useState, useContext } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo._id !== id));
  }

  const updateTodo = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) =>
        prevTodo._id !== updatedTodo._id ? prevTodo : updatedTodo
      ));
  };

  return (
    <TodoContext.Provider value={{ todos, setTodos, addTodo, deleteTodo, updateTodo }}>
      {children}
    </TodoContext.Provider >
  )
};

export const useTodoContext = () => useContext(TodoContext);