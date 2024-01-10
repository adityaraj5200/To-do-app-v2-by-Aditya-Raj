import React, { useState } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useBackendContext } from '../context/BackendContext';
import { useTodoContext } from '../context/TodoContext';


function Todo({ todo }) {
  const { api_base } = useBackendContext();

  const { updateTodo, deleteTodo } = useTodoContext();
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const updateTodoHandler = async (updatedProperties) => {
    try {
      // Make a PUT request to update the todo
      const response = await fetch(`${api_base}/api/todos/${todo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProperties),
      });

      if (!response.ok) {
        // Handle error if needed
        throw new Error('Failed to update todo');
      }

      // Parse the JSON response
      const updatedTodo = await response.json();
      
      // Update state using context
      updateTodo(updatedTodo);

      // Log or handle the updated todo as needed
      console.log('Updated Todo:', updatedTodo);
    } catch (error) {
      // Handle error if needed
      console.error('Error while updating todo:', error);
    }
  };

  const deleteTodoHandler = async () => {
    try {
      // Make a DELETE request to delete the todo
      const response = await fetch(`${api_base}/api/todos/${todo._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        // Handle error if needed
        throw new Error('Failed to delete todo');
      }

      // Update state using context
      deleteTodo(todo._id);

      toast.success(`${todo.text} has been deleted`);

      // Log or handle the success message
      console.log('Todo deleted successfully');

      // Close the modal
      handleClose();
    } catch (error) {
      // Handle error if needed
      console.error('Error while deleting todo:', error);
    }
  };


  return (
    <Card  className='my-2'>
      <Card.Body className='d-flex align-items-center'>
        <div
          className='check-status-logo'
          style={{ cursor: 'pointer' }}
          onClick={() => updateTodoHandler({ isComplete: !todo.isComplete })}
        >
          {todo.isComplete ?
            <i className='bi bi-check-circle me-2'></i> :
            <i className='bi bi-circle me-2'></i>
          }
        </div>


        <div className='todo-title-description w-100 me-auto debugg'>
          <div className='todo-tile fs-5'>{todo.text}</div>
          <div className='todo-description text-muted fs-6'> {todo.description} </div>
        </div>

        <div className='favorite-logo debugg mx-2' onClick={() => updateTodoHandler({ isImportant: !todo.isImportant })}>
          {todo.isImportant ?
            <i className='bi bi-star-fill' style={{ color: 'orange', cursor: 'pointer' }}></i> :
            <i className='bi bi-star' style={{ color: '', cursor: 'pointer' }}></i>
          }
        </div>

        <div className='delete-logo debugg' onClick={handleShow}>
          <i className='bi bi-trash' style={{ color: 'red', cursor: 'pointer' }}></i>
        </div>

        <Modal centered size='lg' show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title onClick={() => { console.log('hello') }} >Delete todo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete your todo titled <strong>{todo.text}</strong> </p>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} >Close</Button>
            <Button
              variant="danger"
              onClick={deleteTodoHandler}
            >
              Delete Todo
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
}

export default Todo;
