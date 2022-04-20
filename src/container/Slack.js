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
import { getChatRoom, createChatRoom, active,  } from "../redux/modules/sock";

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';




const token = sessionStorage.getItem("token", sessionStorage.getItem('token'));



const Slack = (props) => {
  
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

  const [modal, handleModal] = useState(false);
  const user = useSelector((state) => state.user);
  console.log('메인페이지에서 유저 확인 ::', user);
  getChatRoom(token);
  // const [modal, handleModal] = useState(false);
  // const dispatch = useDispatch();

  // 테스트용 : 나중에 삭제
  // const userTest = {
  //   email: 'yesleee@naver.com', 
  //   nick: '테스트용닉네임',
  //   pwd: 1234,
  //   image: 'https://user-images.githubusercontent.com/91959791/162985545-26ce4013-8004-4211-9948-c616aab0182a.png'
  // }
  // React.useEffect(() => {
  //   dispatch(userActions.loginFB(userTest.email, userTest.pwd));
  // }, []);
  React.useEffect(() => {
    ConnectSub();
    // return () => {
    //   DisConnectUnsub();
    // };
  }, []);
   // 여기까지s

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