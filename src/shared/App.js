import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Slack from "../components/Slack";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import SignUp from "../container/SignUp";
import SignIn from "../container/SignIn";
import Headers from "./Headers";
import Chat from "../container/Chat";

function App() {
  return (
    <React.Fragment>
      <Headers />
      <BrowserRouter>
        {/* <Header /> */}
        {/* <Container> */}
          {/* <Sidebar /> */}
          <Route path={"/SignIn"} exact component={SignIn} />
          <Route path={"/slack"} exact component={Slack} />
          <Route path={"/SignUp"} exact component={SignUp} />
          <Route path={"/Chat"} exact component={Chat} />
        {/* </Container> */}
      </BrowserRouter>
    </React.Fragment>
  );
}
// const Container = styled.div`
//   display: flex;
//   height: 100vh;
//   width: 100vw;
// `;

export default App;
