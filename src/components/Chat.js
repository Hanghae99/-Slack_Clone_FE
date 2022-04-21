import React, { useRef } from 'react';
import styled from "styled-components";
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as sockActions } from '../redux/modules/sock';


import Message from './Message';
import ChatItem from './ChatItem';
import axios from "axios";

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';



const Chat = (props) => {
  const dispatch = useDispatch();
  const chatRef = useRef(null);
  const sender = sessionStorage.getItem('user_id');
  const token = sessionStorage.getItem("token");
  let newM = null;

  let sock = new SockJS('http://121.141.140.148:8088/gs-guide-websocket');
  let ws = Stomp.over(sock);

  const roomId = props.match.params.roomId;

  const enterMessage = {
    roomId: roomId,
    username: sender,
    type: 'ENTER',
  }

  function ConnectSub() {
    try {
      ws.connect({}, () => {
        ws.subscribe(
          `/topic/greetings/${roomId}`,
          (response) => {
            console.log("받은 메세지", response);
            const newMessage = JSON.parse(response.body);
            console.log("받은 메세지", newMessage);
            // newM = newMessage
            if (newMessage.length === 1){
              dispatch(sockActions.sendMessage(newMessage));
            }else {
              dispatch(sockActions.getMessageDB(newMessage));
            }
          },
        )
          ws.send(
            `/app/hello`,
            {token: token},
            JSON.stringify(enterMessage)
          )
      });
    } catch (error) {
      console.log("fdfdfdfdf", error.response);
      console.log(error);
    }
  }

  // 연결 해제
  function DisConnectUnsub() {
    try {
      ws.disconnect( {
        token: token
      }, () => {
          ws.unsubscribe(`/topic/greetings/${roomId}`);
        },
        { token: token }
      );
    } catch (error) {
      console.log(error.response);
    }
  }

  React.useEffect(() => {
    ConnectSub();
    // dispatch(sockActions.getMessageDB(newM));
    return () => {
      DisConnectUnsub();
    };
  }, [roomId]);
 
  // const message = useSelector((state) => state.sock.roomMessage)
  // const getMessage = useSelector((state) => state.sock)
  // let message = [];
  // if (getMessage.roomMessage != 'undefined' && getMessage.roomMessage != null) {
  //   message = getMessage.roomMessage;
  // }
  // console.log(message);
  // React.useEffect(() => {
  //   console.log('useEffect 실행');
  //   dispatch(sockActions.getMessageDB(roomId));
  //   // chatRef?.current?.scrollIntoView({
  //   // chatRef.current.scrollIntoView({
  //   //   behavior: 'smooth',
  //   // });
  // // }, [roomId, loading]);
  // }, [roomId]);

  const message = useSelector((state) => state.sock.messageList);
  const _message = message.filter((m) => m.roomId === roomId);
  const dmList = useSelector((state) => state.dm.list);
  const idx = dmList.findIndex((p) => p.chatRoomId === roomId);
  const roomInfo = dmList[idx];
  let roomName = '';
  if (roomInfo != 'undefined' && roomInfo != null) {
    roomName = roomInfo.chatRoomName;
  }
  console.log("db에서 가져온 message ::", message)
  console.log("채팅창에서 가져온 roomId ::", roomId);
  // console.log("채팅창에서 가져온 roomName ::", roomName);

  return (
    <React.Fragment>
      <ChatContainer>
        {/* {message && ()} */}
        <ChatHeader>
          <div className='channel_name'>{roomName}</div>
          <div>
            <button>members</button>
          </div>
        </ChatHeader>
        <Bookmarks>
          <div>
            <button>
              <AddIcon/>{roomName} 방 책갈피추가
            </button>
          </div>
        </Bookmarks>
        <ChatList>
          {_message && _message.map((m,idx) => {
            return (
              // time, userimage 도 넘어가야 함
              <ChatItem key={idx} img={m.imageUrl} createdAt={m.createdAt} message={m.message} username={m.username}/>
            );
          })}
          <ChatBottom ref={chatRef}/>
        </ChatList>

        <Message chatRef={chatRef} roomId={roomId} roomName={roomName}/>
      </ChatContainer>
    </React.Fragment>
  );
}
const ChatBottom = styled.div`
  padding-bottom: 300px;
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
`;

const ChatHeader = styled.div`
  height: 57px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 0 20px;
  box-shadow: 0 1px 0 0 #ccc;
  z-index: 10;
    .channel_name {
      font-size: 18px;
      font-weight: 700;
    }
`;

const Bookmarks = styled.div`
  height: 38px;
  display: flex;
  padding: 0 16px 0 10px;
  align-items: center;
  box-shadow: 0 2px 3px 0 #ccc;
  z-index: 9;
  button {
    display: flex;
    font-size: 13px;
    border: none;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: gray;
    > .MuiSvgIcon-root {
      font-size: 15px;
      margin-right: 5px;
    }
  }
`;

const ChatList = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`;

// const ChatItem = styled.div`
//   padding: 8px 20px;
//   display: flex;
//   .chat_profile {
//     margin-right: 8px;
//     button {
//       height: 36px;
//       width: 36px;
//     }
//   }
//   .chat_text {
//     display: flex;
//     flex-direction: column;
//     // padding: 8px;

//     .chat_info {
//       .chat_user {
//         font-weight: 700;
//         font-size: 15px;
//         margin-right: 10px;
//       }
//       .chat_time {
//         font-size: 12px;
//         color: gray;
//       }
//     }

//     .chat_content: {
//       // margin-bottom: 4px;
//       font-size: 15px;
//     }
    
//   }
// `;
export default Chat;