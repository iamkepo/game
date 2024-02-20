"use client";
// LoginFormComponent.tsx

import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import PasswordInputComponent from '../PasswordInputComponent';
import ErrorAlertComponent from '../ErrorAlertComponent';
import { api } from '@/services/api';

interface LoginFormProps {
  show: boolean;
  handleClose: () => void;
  handleShow: () => void;
}
const LoginFormComponent: React.FC<LoginFormProps> = ({show, handleClose, handleShow}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    api.login({ email, password })
    .then((data: any)=>{
      window.localStorage.setItem("accessToken", data.accessToken)
      window.localStorage.setItem('refreshToken', data?.refreshToken)
      // handleClose();
      window.location.reload()
    })
    .catch(err=> {      
      if (err?.response?.data?.error) {
        setError(err?.response?.data?.error)
      }
      
    })
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
