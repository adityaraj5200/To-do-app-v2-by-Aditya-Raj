import React from 'react';
import { Form,Row,Col } from 'react-bootstrap';

function Stat({question,answer}) {
  return (
    <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          <strong>{question}:</strong>
        </Form.Label>
        <Col sm="10">
          <Form.Control plaintext readOnly defaultValue={answer} />
        </Col>
      </Form.Group>
    </Form>
  )
}

export default Stat