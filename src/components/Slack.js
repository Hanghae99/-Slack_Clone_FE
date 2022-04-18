import React from 'react';
import styled from "styled-components";

import Grid from '../elements/Grid';

import Header from './Header';
import Chat from './Chat';
import Message from './Message';
import Sidebar from './Sidebar';

const Slack = (props) => {
  return (
    <React.Fragment>
      <Header/>
      <Container>
        <Sidebar/>
        <ChatContainer>
          <Chat/>
          <Message/>
        </ChatContainer>
      </Container>
    </React.Fragment>
  );
}

const Container = styled.div`
display: flex;
height: 100vh;
width: 100vw;
`;

const ChatContainer = styled.div`
  flex: 1;
  margin-top: 44px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: space-between;
`;

export default Slack;