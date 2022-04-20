import React, {useState} from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import Header from '../components/Header';
import Chat from '../components/Chat';
import Message from '../components/Message';
import Sidebar from '../components/Sidebar';
import Mypage from '../container/Mypage';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { getChatRoom, createChatRoom } from "../redux/modules/sock";
import { Modal } from '@mui/material';
import ProfileModal from '../components/ProfileModal';

const Stomp = require('@stomp/stompjs');

const token = sessionStorage.getItem("token", sessionStorage.getItem('token'));

const Slack = (props) => {
  // const [modal, handleModal] = useState(false);
  const [modalpro, handleModalpro] = useState(false);
  const user = useSelector((state) => state.user);
  console.log('메인페이지에서 유저 확인 ::', user);
  getChatRoom(token);
  // const [modal, handleModal] = useState(false);
  const dispatch = useDispatch();

  const test = () => {
    handleModalpro(true);
    console.log(modalpro);
  }
  // // 테스트용 : 나중에 삭제
  // const userTest = {
  //   email: 'yesleee@naver.com', 
  //   nick: '테스트용닉네임',
  //   pwd: 1234,
  //   image: 'https://user-images.githubusercontent.com/91959791/162985545-26ce4013-8004-4211-9948-c616aab0182a.png'
  // }
  // React.useEffect(() => {
  //   console.log('제일먼저실행')
  //   dispatch(userActions.loginFB(userTest.email, userTest.pwd));
  // }, []);
  //  // 여기까지s

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
      <Profile>
        {/* <AccountBoxIcon onClick={()=>{handleModal(true);}}/> */}
        {/* <AccountBoxIcon onClick={()=>{test()}}/> */}
        <AccountBoxIcon onClick={()=>{handleModalpro(true);}}/>
      </Profile>

      {/* {modal && <Mypage onClose={handleModal}/>} */}
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