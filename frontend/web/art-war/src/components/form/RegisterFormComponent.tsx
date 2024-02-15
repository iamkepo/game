// RegisterFormComponent.tsx

import { useState } from 'react';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import PaletteColorsComponent from '../PaletteColorsComponent';
import ErrorAlertComponent from '../ErrorAlertComponent';
import PasswordInputComponent from '../PasswordInputComponent';
import { api } from '@/services/api';

const RegisterFormComponent = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      
      fetchCurrentUser(); // Ferme le modal après l'inscription
    })
    .catch(err=> {
      // console.log(err?.response?.data);
      if (err?.response?.data?.error) {
        setError(err?.response?.data?.error)
      }
    })
  };
  const fetchCurrentUser = () => {
    api.fetchCurrentUser()
    .then(data=>{
      console.log(data);
      
      handleClose(); // Ferme le modal après l'inscription
    })
    .catch(err=> {
      if (err?.response?.data?.error) {
        setError(err?.response?.data?.error)
      }
    })
  }
  const addUserToColor = () => {
    api.addUserToColor({colorId: selectedColor})
    .then(data=>{
      console.log(data);
      
      handleClose(); // Ferme le modal après l'inscription
    })
    .catch(err=> {
      if (err?.response?.data?.error) {
        setError(err?.response?.data?.error)
      }
    })
  }

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    console.log('Selected Color:', color);
  };
  const handleErrorClose = () => {
    setError(null);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Register
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <PaletteColorsComponent onSelect={handleColorSelect} />
            </Col>
            <Col xs={12} md={6}>
              <Form onSubmit={handleSubmit}>
              { error && <ErrorAlertComponent message={error} onClose={handleErrorClose} />}

                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" value={username} onChange={(e)=>setUsername(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                </Form.Group>

                <PasswordInputComponent controlId='formBasicPassword' label="password"  placeholder="Password" password={password} setPassword={setPassword} />
                
                <PasswordInputComponent controlId='formBasicConfirmPassword' label="Confirm Password"  placeholder="Confirm Password" password={confirmPassword} setPassword={setConfirmPassword} />


                <Form.Group controlId="formBasicColor">
                  <Form.Label>Selected Color</Form.Label>
                  <Form.Control type="text" readOnly value={selectedColor || ''} />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterFormComponent;
