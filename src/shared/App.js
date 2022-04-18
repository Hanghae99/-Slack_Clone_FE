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

  const is_session = sessionStorage.getItem("user_id") ? true : false;
  console.log(is_session);

  return (
    <React.Fragment>
      <BrowserRouter>
        <Route path={"/signin"} exact component={SignIn} />
        <Route path={"/slack"} exact component={Slack} />
        <Route path={"/signup"} exact component={SignUp} />
        <Route path={"/chat"} exact component={Chat} />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
