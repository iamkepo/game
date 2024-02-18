import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import ErrorAlertComponent from './ErrorAlertComponent';
import { api } from '@/services/api';

interface PaletteColorsProps {
  show: boolean;
  handleClose: () => void;
  handleShow: () => void;
}

const PaletteColorsComponent: React.FC<PaletteColorsProps> = ({show, handleClose, handleShow}) => {
  const [colors, setColors] = useState<string[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    generateRandomColors();
  }, []);

  const generateRandomColors = () => {
    const newColors = [];
    for (let i = 0; i < 100; i++) {
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      newColors.push(randomColor);
    }
    setColors(newColors);
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    api.addUserToColor({colorId: selectedColor})
    .then(data=>{
      console.log(data);
      handleClose();
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

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    console.log('Selected Color:', color);
  };
  return (
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Selected Color</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            selectedColor ?

            <Form onSubmit={handleSubmit}>
              { error && <ErrorAlertComponent message={error} onClose={handleErrorClose} />}
    
              <Form.Group controlId="formBasicColor">
                <Form.Control type="text" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} />
              </Form.Group> 

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          :
            <Row>
              {colors.map((color: string, index: number) => (
                <Col key={index} xs={5} sm={3} md={2} lg={1} className="mb-3">
                  <Button className='p-3' style={{ backgroundColor: color }} onClick={() => handleColorSelect(color)} />
                </Col>
              ))}
            </Row>
          }

      </Modal.Body>
    </Modal>
    
  );
};

export default PaletteColorsComponent;
