import React, { useState } from 'react';
import { InputGroup, Form, Row, Col, Button, Modal } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';


import { useTodoContext } from '../context/TodoContext';
import { useBackendContext } from '../context/BackendContext';
import { useAuthContext } from '../context/AuthContext';


function AddTodo() {
  const { api_base } = useBackendContext();
  const { currentUser } = useAuthContext();

  const { addTodo } = useTodoContext();

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [todoData, setTodoData] = useState({
    text: '',
    description: '',
    isImportant: false,
    dueDate: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setTodoData((prevData) => ({
      ...prevData,
      [name]: (type === 'checkbox' ? checked : value)
    }));
  };



  const resetInputValues = () => {
    // Reset the form or update the state
    setTodoData({
      text: '',
      description: '',
      isImportant: false,
      dueDate: ''
    });
  };

  const addTodoHandler = async () => {
    console.log('addTodoHandler is called');
    try {
      const response = await fetch(`${api_base}/api/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${currentUser.token}`
        },
        body: JSON.stringify(todoData)
      });

      if (!response.ok) {
        console.error('Failed to add new Todo');
        return;
      }

      const newTodo = await response.json();
      // res.json(newTodo);

      if (newTodo) {
        console.log('New todo successfully added:', newTodo);
        toast.success(`${todoData.text} added successfully`);
        // Update state using context
        addTodo(newTodo);
        resetInputValues();
        handleClose();
      } else {
        console.error('Error: Response JSON is undefined or null');
      }
    } catch (error) {
      console.error('Error adding new Todo. Error: ' + error);
    }
  };

  return (
    <div>
      <Row className='py-3 debugg flex-column flex-md-row'>
        <InputGroup as={Col} className="py-1 debugg">
          <Form.Control
            style={{ border: "1px solid rgba(0,0,0,0.3)" }}
            placeholder='Enter a quick todo'
            name="text"
            value={todoData.text}
            onChange={handleChange}
          />
          <Button as="input" type="submit" value="Quick add a Todo" onClick={addTodoHandler} />
        </InputGroup>

        <InputGroup as={Col} className="py-1 debugg">
          <Button className='w-100' variant="outline-primary" onClick={handleShow}>
            Add a new detailed Todo
          </Button>

          <Modal centered size='lg' show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title onClick={() => {console.log(todoData)}} >Add a new Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Enter your Todo</Form.Label>
                  <Form.Control name="text" value={todoData.text} onChange={handleChange} required type="text" placeholder="Bring vegetables" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Enter Todo description (Optional)</Form.Label>
                  <Form.Control name="description" value={todoData.description} onChange={handleChange} as="textarea" placeholder='1kg potatoes, 2kg tomatoes from ABC market' />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    name="isImportant"
                    checked={todoData.isImportant}
                    onChange={handleChange}
                    type={"checkbox"}
                    label={"Mark this Todo as Important"}
                    id="addToImportantCheckbox"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <span>Complete it by: </span>
                  <DatePicker
                    showIcon
                    toggleCalendarOnIconClick
                    placeholderText='MM/DD/YYYY'
                    selected={todoData.dueDate}
                    onChange={(newDate) => {
                      setTodoData((prevData) => ({
                        ...prevData,
                        dueDate: newDate
                      }));
                    }}
                  />
                </Form.Group>


              </Form>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
              <Button
                variant="primary"
                onClick={addTodoHandler}
              >
                Add new Todo
              </Button>
            </Modal.Footer>
          </Modal>

        </InputGroup>

      </Row>

    </div>
  )
}

export default AddTodo