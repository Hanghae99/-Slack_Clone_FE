import React, {useState} from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/ConfigStore';

import Header from '../components/Header';
import Chat from '../components/Chat';
import Message from '../components/Message';
import Sidebar from '../components/Sidebar';
import Mypage from '../container/Mypage';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Modal } from '@mui/material';
import ProfileModal from '../components/ProfileModal';
import { getChatRoom, createChatRoom, active,  } from "../redux/modules/sock";

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const token = sessionStorage.getItem("token", sessionStorage.getItem('token'));

const Slack = (props) => {
  const dispatch = useDispatch();
  const [modalpro, handleModalpro] = useState(false);
  const chatInfo = useSelector((state) => state.sock);
  console.log(chatInfo);
  
  // active();
  let sock = new SockJS("http://121.141.140.148:8088/gs-guide-websocket");
  let ws = Stomp.over(sock);

  function ConnectSub() {
    try {
      ws.connect({}, () => {
        ws.subscribe(
          `/topic/greetings`,
          (response) => {
            console.log("받은 메세지", response);
            const newMessage = JSON.parse(response.body);
            console.log("받은 메세지", newMessage);
            // dispatch(ChatCreators.getMessage(newMessage));
          },
          // {
              // token: token
          // }
        );
      });
    } catch (error) {
      console.log("fdfdfdfdf", error.response);
      console.log(error);
    }
  }

  const user = useSelector((state) => state.user);
  console.log('메인페이지에서 유저 확인 ::', user);
  getChatRoom(token);
  
  React.useEffect(() => {
    console.log('메인페이지에서 제일먼저 실행')
    dispatch(userActions.getUserDB());
  }, []);

  React.useEffect(() => {
    ConnectSub();
    // return () => {
    //   DisConnectUnsub();
    // };
  }, []);

  return (
    <React.Fragment>
      <Header/>
      <Container>
        <Sidebar/>
        <ChatContainer>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path={"/slack/:roomId"} exact component={Chat} />
            </Switch>
          </ConnectedRouter>

          {/* <Chat/> */}
          <Message/>
        </ChatContainer>
      </Container>
      <Profile>
        <AccountBoxIcon onClick={()=>{handleModalpro(true);}}/>
      </Profile>
      {modalpro && <ProfileModal onClose={handleModalpro}/>}
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

const Profile = styled.div`
  flex: 0.25;
  display: flex; 
  align-items: center; 
  justify-content: flex-end;
  flex-grow: 0;
  padding: 0 16px;
  position: relative;
  > .MuiSvgIcon-root {
    position: fixed;
    top: 4px;
    right: 13px;
    font-size: 36px;
    color: white;
    cursor: pointer;
  }
`;

export default Slack;