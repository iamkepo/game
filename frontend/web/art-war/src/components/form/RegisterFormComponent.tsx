// RegisterFormComponent.tsx

import { useState } from 'react';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import ErrorAlertComponent from '../ErrorAlertComponent';
import PasswordInputComponent from '../PasswordInputComponent';
import { api } from '@/services/api';

interface RegisterFormProps {
  show: boolean;
  handleClose: () => void;
  handleShow: () => void;
  setShowLogin: () => void;
}
const RegisterFormComponent: React.FC<RegisterFormProps> = ({show, handleClose, handleShow, setShowLogin}) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Submit registration data
    api.register({ email, password, username })
    .then(data=>{
      console.log(data);
      handleClose();
      setShowLogin();
    })
    .catch(err=> {
      // console.log(err?.response?.data);
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
        Register
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
          { error && <ErrorAlertComponent message={error} onClose={handleErrorClose} />}

            <Form.Group controlId="formBasicName">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter your username" value={username} onChange={(e)=>setUsername(e.target.value.toLowerCase())} required />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </Form.Group>

            <PasswordInputComponent controlId='formBasicPassword' label="password"  placeholder="Password" password={password} setPassword={setPassword} />
            
            <PasswordInputComponent controlId='formBasicConfirmPassword' label="Confirm Password"  placeholder="Confirm Password" password={confirmPassword} setPassword={setConfirmPassword} />

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterFormComponent;
