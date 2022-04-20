import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/ConfigStore';
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';

// import Sidebar from "../components/Sidebar";

import Slack from "../container/Slack";
import SignUp from "../container/SignUp";
import SignIn from "../container/SignIn";
import Chat from "../container/Chat";
import Mypage from "../container/Mypage";

function App() {

  const is_session = sessionStorage.getItem("user_id") ? true : false;
  console.log('is_session ?',is_session);

  return (
    <React.Fragment>
      {/* <BrowserRouter> */}
      <ConnectedRouter history={history}>
        <Route path={"/signin"} exact component={SignIn} />
        <Route path={"/slack"} exact component={Slack} />
        <Route path={"/signup"} exact component={SignUp} />
        <Route path={"/chat"} exact component={Chat} />
        <Route path={"/mypage"} exact component={Mypage} />
      </ConnectedRouter>
      {/* </BrowserRouter> */}
    </React.Fragment>
  );
}

export default App;
