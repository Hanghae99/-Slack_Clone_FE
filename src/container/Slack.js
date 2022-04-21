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

const token = sessionStorage.getItem("token", sessionStorage.getItem('token'));

const Slack = (props) => {
  const dispatch = useDispatch();
  const [modalpro, handleModalpro] = useState(false);
  const chatInfo = useSelector((state) => state.sock);
  console.log(chatInfo);
  
  // active();
  const user = useSelector((state) => state.user);
  console.log('메인페이지에서 유저 확인 ::', user);
  getChatRoom(token);
  
  let image = '';
  if (user.user != 'undefined' && user.user != null) {
    image = user.user.image;
  }
  
  React.useEffect(() => {
    console.log('메인페이지에서 제일먼저 실행')
    dispatch(userActions.getUserDB());
  }, []);



  return (
    <React.Fragment>
      <Header/>
      <Container>
        <Sidebar/>
        <ChatContainer>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path={"/slack/:roomId"} component={Chat} />
            </Switch>
          </ConnectedRouter>

          {/* <Chat/> */}
          {/* <Message chatInfo={chatInfo}/> */}
        </ChatContainer>
      </Container>
      <Profile>
        <img 
          className='user_profile'
          onClick={()=>{handleModalpro(true);}}
          src={image ? image : "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png"}/>
        {/* <AccountBoxIcon onClick={()=>{handleModalpro(true);}}/> */}
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
  img {
    position: fixed;
    top: 6px;
    right: 13px;
    border-radius: 4px;
    height: 30px;
    width: 30px;
    overflow: hidden;
    object-fit: cover;
    cursor: pointer;
  }
`;

export default Slack;