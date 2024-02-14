import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

interface PasswordInputProps {
  controlId: string;
  label: string;
  placeholder: string;
  password: string;
  setPassword: (e: any) => void
}

const PasswordInputComponent: React.FC<PasswordInputProps> = ({ controlId, label, placeholder, password, setPassword }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form.Group controlId={controlId} className='position-relative'>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Form.Check className='position-absolute end-0 me-0 top-50' type="checkbox" label="" onChange={togglePasswordVisibility} />
    </Form.Group>
  );
};

export default PasswordInputComponent;
