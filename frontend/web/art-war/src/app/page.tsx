"use client";
import {  useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Provider } from 'react-redux';
import store from "@/lib/store";
import SocketService from "@/configs/socket-service";

import styles from "./page.module.css";
import Header from "@/components/Header";
import RightSidebar from "@/components/RightSidebar";
import LeftSidebar from "@/components/LeftSidebar";
import CelComponent from "@/components/CelComponent";

export default function Home() {
  const [tab, setTab] = useState<any[]>([]);  
  const [padding, setPadding] = useState<string>('0.5px');  

  useEffect(()=> {
    var socketService = new SocketService('dcfghgjh');
    socketService.connect();
    let rows = [];
    let cels = [];

    for (let i = 0; i < 600; i++) {
      for (let j = 0; j < 600; j++) {
        cels[j] = '';
      }
      rows[i] = cels
    }
    setTab(rows);    
  },[])

  const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  const setZoom = (event: any) => {
    setPadding(event.target.value);
  }
  return (
    <Provider store={store}>
      <Container fluid>
        <Header />
        <Row>
          <Col xs={3} id="sidebar" className="">
            <LeftSidebar />
          </Col>
          <Col xs={6} id="page-content">
            <div id="board" className="mx-auto">
              <table>
                <thead></thead>
                <tbody>
                {
                  tab.map((row: [], i: number) => (
                    <tr key={i}>
                      {
                        row.map((cel: string, j: number) => (
                          <CelComponent 
                            key={j} 
                            cel={cel}
                            backgroundColor={getRandomColor()}
                            padding={padding}
                          />                
                        ))
                      }
                    </tr>
                  ))
                }
                </tbody>
                <tfoot></tfoot>
              </table>
            </div>
          </Col>
          <Col xs={3} id="sidebar" className="">
            <RightSidebar setZoom={setZoom} />
          </Col>
        </Row>
      </Container>
    </Provider>
  );
}
