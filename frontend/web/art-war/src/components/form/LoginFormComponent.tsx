// LoginFormComponent.tsx

import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import PasswordInputComponent from '../PasswordInputComponent';
import ErrorAlertComponent from '../ErrorAlertComponent';
import { api } from '@/services/api';

const LoginFormComponent = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log('Login data:', { email, password });
    api.login({ email, password })
    .then(data=>{
      console.log(data);
      
    })
    .catch(err=> {
      console.log(err);
      
    })
    handleClose(); // Close the modal after login
  };
  const handleErrorClose = () => {
    setError(null);
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
          { error && <ErrorAlertComponent message={error} onClose={handleErrorClose} />}

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </Form.Group>

            <PasswordInputComponent controlId='formBasicPassword' label="password"  placeholder="Password" password={password} setPassword={setPassword} />

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginFormComponent;
