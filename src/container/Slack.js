import React, {useState} from 'react';
import styled from "styled-components";

import Header from '../components/Header';
import Chat from '../components/Chat';
import Message from '../components/Message';
import Sidebar from '../components/Sidebar';
import Mypage from '../container/Mypage';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { getChatRoom, createChatRoom } from "../redux/modules/sock";

const Stomp = require('@stomp/stompjs');

const token = sessionStorage.getItem("token", sessionStorage.getItem('token'));

const Slack = (props) => {
  const [modal, handleModal] = useState(false);
  getChatRoom(token);
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
        {/* add onClick function 
        - profile img / userId / active-status
        - '자신을 활성(자리비움)으로 설정'
        - 알림일시 중지
        - 프로필편집 : id(계정) / 닉네임(변경가능;중복체크) / 칭호 / 프로필사진(준비중)
        - 로그아웃  </div> */}
        <AccountBoxIcon onClick={()=>{handleModal(true);}}/>
      </Profile>

      {modal && <Mypage onClose={handleModal}/>}
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
  }
`;

export default Slack;