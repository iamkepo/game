"use client";
import React, { Component, ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SocketService from "@/configs/socket-service";

import RightSidebar from "@/layouts/RightSidebar";
import LeftSidebar from "@/layouts/LeftSidebar";
import PaletteColorsComponent from '@/components/PaletteColorsComponent';
import { api } from "@/services/api";
import BoardComposant from "@/components/BoardComponant";
import Header from "@/layouts/Header";

interface HomeState {
  config: {
    rows: number;
    cels: number;
  };
  padding: string;
  showPalette: boolean;
  isMounted: boolean;
  isAuthenticated: boolean;
  user: object;
  color: {
    _id: string;
    color: string
  }
}

export default class Home extends Component<{}, HomeState> {
  socketService: SocketService;

  constructor(props: {}) {
    super(props);
    this.state = {
      config: {
        rows: 0,
        cels: 0
      },
      padding: '5px',
      showPalette: false,
      isMounted: false,
      isAuthenticated: false,
      user: {},
      color: {
        _id: '',
        color: ''
      }
    };
    this.socketService = new SocketService();
  }

  componentDidMount(): void {
    if (!this.state.isMounted) {
      
      this.setState({ config: {rows: 150, cels: 150} }); 

      this.socketService.connect();

      let token = window.localStorage.getItem("refreshToken");
      if (token) {
        this.fetchCurrentUser();
      }
      console.log("Le composant est monté.");
      this.setState({ isMounted: true });
    }
  }
  fetchCurrentUser = () => {
    api.fetchCurrentUser()
    .then((data: any)=>{
      // console.log(data);
      this.setState({ user: data, isAuthenticated: true });  
      this.getMyColors();
    })
    .catch(err=> {
      console.log(err);
    })
  };
  
  getMyColors = () => {
    api.getMyColors()
    .then((data: any)=>{
      // console.log(data);
      if (data.length == 0) {
        this.setState({ showPalette: true });  
      }
    })
    .catch(err=> {
      console.log(err?.response?.data);
    })
  };
  setZoom = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ padding: event.target.value });
  }

  render(): ReactNode {
    return (
      <Container fluid>
        <Header />
        <Row>
          <Col xs={3} id="left-sidebar">
            <LeftSidebar />
          </Col>
          <Col xs={6} id="page-content" className="px-0 mt-2">
            <BoardComposant 
              config={this.state.config} 
              color={this.state.color} 
              padding={this.state.padding} 
            /> 
          </Col>
          <Col xs={3} id="right-sidebar">
            <RightSidebar setZoom={(e: any)=> this.setZoom(e)} />
          </Col>
        </Row>
        <PaletteColorsComponent 
          show={this.state.showPalette}
          setPalette={(e: any)=> this.setState({ color: e })}
          handleClose={() => this.setState({ showPalette: false })}
        />
      </Container>
    );
  }
}
