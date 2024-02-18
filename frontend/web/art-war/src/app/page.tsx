"use client";
import React, { Component, ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Provider } from 'react-redux';
import store from "@/lib/store";
import SocketService from "@/configs/socket-service";

import Header from "@/components/Header";
import RightSidebar from "@/components/RightSidebar";
import LeftSidebar from "@/components/LeftSidebar";
import CelComponent from "@/components/CelComponent";
import PaletteColorsComponent from '@/components/PaletteColorsComponent';

interface HomeState {
  tab: string[][];
  padding: string;
  showPalette: boolean;
}

export default class Home extends Component<{}, HomeState> {
  socketService: SocketService;

  constructor(props: {}) {
    super(props);
    this.state = {
      tab: [],
      padding: '5px',
      showPalette: false,
    };
    this.socketService = new SocketService();
  }

  componentDidMount(): void {
    let rows: string[][] = [];
    
    for (let i = 0; i < 150; i++) {
      let cels: string[] = [];
      for (let j = 0; j < 150; j++) {
        cels[j] = '';
      }
      rows[i] = cels;
    }
    
    this.setState({ tab: rows });  
    this.socketService.connect();
    this.setState({ showPalette: true });  
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  setZoom = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ padding: event.target.value });
  }

  render(): ReactNode {
    return (
      <Provider store={store}>
        <Container fluid>
          <Header />
          <Row>
            <Col xs={3} id="left-sidebar">
              <LeftSidebar />
            </Col>
            <Col xs={6} id="page-content" className="px-0 mt-2">
              <div id="board" className="mx-auto">
                <table>
                  <thead />
                  <tbody>
                    {this.state.tab.map((row: string[], i: number) => (
                      <tr key={i}>
                        {row.map((cel: string, j: number) => (
                          <CelComponent 
                            key={j} 
                            cel={cel}
                            backgroundColor={this.getRandomColor()}
                            padding={this.state.padding}
                          />                
                        ))}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot />
                </table>
              </div>
              
            </Col>
            <Col xs={3} id="right-sidebar">
              <RightSidebar setZoom={(e: any)=> this.setZoom(e)} />
            </Col>
          </Row>
          <PaletteColorsComponent 
            show={this.state.showPalette}
            handleShow={() => this.setState({ showPalette: true })} 
            handleClose={() => this.setState({ showPalette: false })}
          />
        </Container>
      </Provider>
    );
  }
}
