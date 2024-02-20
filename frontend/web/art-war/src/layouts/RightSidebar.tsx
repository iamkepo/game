import React, { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import RegisterFormComponent from '../components/form/RegisterFormComponent';
import LoginFormComponent from '../components/form/LoginFormComponent';
import { api } from '@/services/api';

interface RightSidebarProps {
  setZoom: (value: string) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({setZoom}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
 
  return (
    <Navbar bg="light" expand="lg" id="sidebar" className="">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-column">
          <Nav.Item>
            <RegisterFormComponent 
              show={showRegister}
              handleShow={()=> setShowRegister(true)} 
              handleClose={()=> setShowRegister(false)}
              setShowLogin={()=> setShowLogin(true)}
            />
            <LoginFormComponent 
              show={showLogin}
              handleShow={()=> setShowLogin(true)} 
              handleClose={()=> setShowLogin(false)}
            />
          </Nav.Item>
          <Nav.Item>
            <select className="form-select" onChange={(e: any)=>setZoom(e)}>
              <option value="0.5px">normal</option>
              <option value="1px">2x</option>
              <option value="1.5px">3x</option>
              <option value="2px">4x</option>
              <option value="2.5px">5x</option>
              <option value="3px">6x</option>
              <option value="3.5px">7x</option>
              <option value="4px">8x</option>
              <option value="4.5px">9x</option>
              <option value="5px">10x</option>
            </select>
          </Nav.Item>
          <Nav.Link href="#anotherlink">Another Link</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default RightSidebar;