import React from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";

import Slack from '../components/Slack';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header/>
        <Container>
          <Sidebar/>
          <Route path="/slack" exact component={Slack}/>
        </Container>
      </BrowserRouter>
    </React.Fragment>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

export default App;
