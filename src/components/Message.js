import React from 'react';
import styled from "styled-components";
// import SockJsClient from 'react-stomp';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as sockActions } from '../redux/modules/sock';





const Message = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");

  let sock = new SockJS('http://121.141.140.148:8088/gs-guide-websocket');
  let ws = Stomp.over(sock);

  console.log(props)
  const {roomName, roomId} = props;

  console.log(roomName, roomId, props)

  // 보내는 사람
  const sender = sessionStorage.getItem('user_id');
  // 보낼 메세지
  const [text, setText] = React.useState('');
  // 방
  // const url = window.location.href 
  // const roomId2 = url.split('/')[4];
  // 방확인 2번째 방법
  // const roomId = props.chatInfo.chatRoomId;
  console.log("메시지 입력창에서 가져온 roomId ::", roomId);


  const onSend = async () => {
    try {
      if (!token) {
        alert('문제가 발생했습니다. 다시 로그인 해주세요.');
        history.replace('/');
      }
      // send할 데이터
      const message = {
        // roomId: roomId.roomid,
        roomId: roomId,
        message: text.target.value,
        username: sender,
        type: 'TALK',
      }
      // 빈문자열이면 리턴
      if (text === '') {
        return;
      }
      // 로딩 중
      waitForConnection(ws, function () {
        ws.send(
          `/app/hello`,
          { token: token },
          JSON.stringify(message)
        );
        console.log(ws.ws.readyState);
        // dispatch(ChatCreators.sendMessage(message));
        setText("");
      });
    } catch (error) {
      console.log(error);
      console.log(ws.ws.readyState);
    }
  }
  // 웹소켓이 연결될 때 까지 실행
    function waitForConnection(ws, callback) {
      setTimeout(
        function () {
          // 연결되었을 때 콜백함수 실행
          if (ws.ws.readyState === 1) {
            callback();
            // 연결이 안 되었으면 재호출
          } else {
            waitForConnection(ws, callback);
          }
        },
        1 // 밀리초 간격으로 실행
      );
    }
  return (
    <React.Fragment>
      <MessageContainer>
        <MessageForm>
          <div className='m_format'>
            <button>B</button>
            <button>I</button>
            <button>S</button>
            <span></span>
            <button>L</button>
            <span></span>
            <button>N</button>
            <button>D</button>
            <span></span>
            <button>Q</button>
            <span></span>
            <button>C</button>
            <button>C</button>
          </div>
          <div className='m_text'>
            <input  onChange={setText} placeholder={roomId}/>
          </div>
          <div className='m_toolbar'> 
            <button>+</button>
            <div className='buttons'>
              <span></span>
              <button>C</button>
              <button>A</button>
              <span></span>
              <button>E</button>
              <button>@</button>
              <button>F</button>
            </div>
            <div className='submit'>
              <button onClick={onSend}>보내기</button>
            </div>
          </div>
        </MessageForm>
      </MessageContainer>
    </React.Fragment>
  );
}

const MessageContainer = styled.div`
  position: relative;
  z-index: 50;
`;

const MessageForm = styled.div`
  position: absolute;
  bottom: 150px;
  left: 6px;
  right: 6px;
  margin: 0 20px 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  button {
    cursor: pointer;
  }
  .m_format {
    padding: 4px;
    background-color: #efefef;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    display: flex;
    button {
      height: 28px;
      width: 28px;
      padding: 2px;
      margin: 2px;
      border-radius: 4px;
      border: none;
      background-color: transparent;
    }
    span {
      width: 1px;
      height: 20px;
      margin: 2px 4px;
      background-color: #ccc;
      align-self: center;
    }
  }
  .m_text {
    padding: 8px 12px;
    box-sizing: border-box;
    input {
      border: none;
      outline: none;
    }
  }
  .m_toolbar {
    padding: 4px 6px 4px 6px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      width: 24px;
      height: 24px;
      border-radius: 24px;
      outline: none;
      border: none;
      font-size: 20px;
    }
    .buttons {
      display: flex;
      align-items: center;
      flex-grow: 1;
      // flex-shrink: 1;
      // padding-left: 0;
      // padding-right: 0;
      span {
        width: 1px;
        height: 20px;
        margin: 2px 4px;
        background-color: #ccc;
        align-self: center;
      }
      button {
        font-size: 15px;
        height: 28px;
        width: 28px;
        padding: 2px;
        margin: 2px;
        border-radius: 4px;
        border: none;
        background-color: transparent;

      }
    }
    .submit {
      button {
        heigth: 28px;
        border-radius: 4px;
        padding: 2px 8px;
        width: auto;
        font-size: 13px;
        background-color: #007a5a;
        color: #fff;
        align-items: center;
        justify-content: center;
      }
    }
`;

export default Message