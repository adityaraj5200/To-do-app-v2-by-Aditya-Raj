import React from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';

function Body() {
  return (
    <div className='debugg' style={{ backgroundColor: "#F6F7F8" }}>
      <div className="position-sticky top-0" style={{ zIndex: 1000, background: "#F6F7F8" }}>
        <AddTodo />
      </div>
      <TodoList />
    </div>
  )
}

export default Body;
