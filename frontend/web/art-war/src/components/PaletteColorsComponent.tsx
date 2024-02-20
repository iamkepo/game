import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import ErrorAlertComponent from './ErrorAlertComponent';
import { api } from '@/services/api';

interface PaletteColorsProps {
  show: boolean;
  handleClose: () => void;
}

const PaletteColorsComponent: React.FC<PaletteColorsProps> = ({show, handleClose}) => {
  const [colors, setColors] = useState<{color:object, id: string}[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isMounted) {      
      api.getColorsUnassigned()
      .then((data: any)=>{
        // console.log(data);
        setColors(data)
      })
      .catch(err=> {
        console.log(err?.response?.data);
      })
      
      setIsMounted(true);
    }
  }, [isMounted]);

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
  };
  return (
      <Modal show={show} onHide={handleClose} size={selectedColor ? undefined : "lg"}>
        <Modal.Header closeButton>
          <Modal.Title>Selected Color</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            selectedColor ?

            <Form onSubmit={handleSubmit}>
              { error && <ErrorAlertComponent message={error} onClose={handleErrorClose} />}

              <div style={{ backgroundColor: selectedColor, height: '300px'}}/>

              <Form.Group controlId="formBasicColor">
                <Form.Control type="text" value={selectedColor} readOnly />
              </Form.Group>  
              <Button variant="danger" type="button" onClick={()=> setSelectedColor(null)}>
                Back
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          :
            <Row>
              {colors.map((item: any, index: number) => (
                <Col key={index} xs={4} sm={3} md={2} lg={1} className="mb-3">
                  <Button className='p-4' style={{ backgroundColor: item.color }} onClick={() => handleColorSelect(item.color)} />
                </Col>
              ))}
            </Row>
          }

      </Modal.Body>
    </Modal>
    
  );
};

export default PaletteColorsComponent;
