import React from 'react';
import ReactDOM from 'react-dom';
import { CoPresent } from '@mui/icons-material';
import axios from 'axios';

import * as SockJS from 'sockjs-client';
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const Stomp = require("@stomp/stompjs");
// import Stomp from 'stompjs';


// - 리덕스

const SET_DM = "SET_DM"; 
const ADD_DM = "ADD_DM"; 
const ENTER_ROOM = "ENTER_ROOM";
const GET_MESSAGE = "GET_MESSAGE";
const SEND_MESSAGE = "SEND_MESSAGE";

const setDm = createAction(SET_DM, (dm_list) => ({dm_list}));
const addDm = createAction(ADD_DM, (dm) => ({dm}));
const enterRoom = createAction(ENTER_ROOM, (chatRoomId) => ({chatRoomId}));
const getMessage = createAction(GET_MESSAGE, (message) => ({message}));
const sendMessage = createAction(SEND_MESSAGE, (message) => ({message}));

const initialState = {
  list: [],
  messageList: [],
  roomMessage: [],
  chatRoomId: null,
}
// - 여기까지

const nickname = sessionStorage.getItem("user_id");
const token = sessionStorage.getItem("token");


const client = new Stomp.Client({
  brokerURL: "http://121.141.140.148:8088/gs-guide-websocket",
  connectHeaders: {
    nickname: nickname,
    'Authorization': token
  },
  debug: function(str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});
const active = () => {
  client.onConnect = function(frame) {
    // Do something, all subscribes must be done is this callback
    // This is needed because this will be executed after a (re)connect
    const subscription = client.subscribe('topic/greetings', (res) => {
      console.log(res)
    })
    subscription();

  };
  client.onStompError = function(frame) {
    // Will be invoked in case of error encountered at Broker
    // Bad login/passcode typically will cause an error
    // Complaint brokers will set `message` header with a brief message. Body may contain details.
    // Compliant brokers will terminate the connection after any error
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
  };

  client.activate();
};

const deactivate = () => {
  client.deactivate();
};

const getChatRoom = (token) => {
  return function (dispatch, getState, { history }) {
  axios({
    method: "GET",
    url: "http://121.141.140.148:8088/chatRoom/get",
    // params: {'Authorization' : token},
    headers: {
      "content-type": "applicaton/json;charset=UTF-8", 
      "accept": "application/json", 
      'Authorization' : token},
  })
    .then((res) => {
        console.log('서버에서 DM방 목록 요청 후 받은 데이터 ::', res);
        dispatch(setDm(res.data));
    })
    .catch((error) => {
      console.log('서버에서 DM방 목록 가져오는 중 오류 ::', error);
    });
  };
};
// const appendChatRoom = (chatRoomData) => {
//   return function (dispatch, getState, { history }) {
//     console.log(chatRoomData.data);
//     const _list = chatRoomData.data;
//     console.log(_list);
//       dispatch(setDm(_list));
//     return;
//     apis
//       .getDm()
//       .then((res) => {
//         console.log('dm list 서버로부터 받은 데이터 :: ', res);
//         dispatch(setDm(res.data));
//       })
//       .catch((err) => {
//         console.log('dm list 서버에서 가져오는데 오류 발생 :: ', err);
//       });
      
//   };
  // const chatSelection = document.getElementById("create");
  
  // for(let i=0; i<chatRoomData.data.length; i++){
  //   let chatRoomId = chatRoomData.data[i]['chatRoomId'];
  //   let chatRoomName = chatRoomData.data[i]['chatRoomName'];
  //   let chatRoom = `<div id="${chatRoomId}" onclick="location.href='/chat/${chatRoomId}'">
  //       ${chatRoomName}
  //   </div>`;
  //   console.log('chatRoom', chatRoom);
  //   console.log(typeof chatRoom);
  //   console.log('chatSelection', chatSelection);
  //   // chatSelection.append(chatRoom);
  //   chatSelection.append(chatRoom.innerHTML);

  //   console.log('chatSelection', chatRoom.innerHTML);
    // ReactDOM.render(chatRoom,  document.getElementById("create"))

  // }
// };

// // middleware
// const getDmDB = () => {
//   return function (dispatch, getState, { history }) {
//     console.log('getDmDB 연결 완료!!');
//     const list = ['테스트1', '테스트2', '테스트3']
//     dispatch(setDm(list));
//     return;
//     apis
//       .getDm()
//       .then((res) => {
//         console.log('dm list 서버로부터 받은 데이터 :: ', res);
//         dispatch(setDm(res.data));
//       })
//       .catch((err) => {
//         console.log('dm list 서버에서 가져오는데 오류 발생 :: ', err);
//       });
      
//   };
// };

const createChatRoom = (createRoom) => {
  return function (dispatch, getState, { history }) {
  axios({
    method: "POST",
    url: "http://121.141.140.148:8088/chatRoom/create",
    headers: {
      // "content-type": "applicaton/json;charset=UTF-8", 
      // "accept": "application/json", 
      'Authorization' : token},
    data: {
      'chatRoomName': createRoom
    },
  })
  .then((res) => {
    console.log('dm 서버에 추가 성공후 전달 데이터 :: ', res);
    dispatch(addDm(res.data));
  })
  .catch((err) => {
    console.log('dm 서버에 추가중 오류 발생 :: ', err);
  });
    // .then(function(response) {
    //   console.log(response);
    // })
    // .catch(function(error) {
    //   console.log(error);
    // });
  };
};

const getMessageDB = (roomId) => {
  return function (dispatch, getState, { history }) {
    const originMessage = getState().sock.messageList;
    const _message = originMessage.filter((m) => m.roomId === roomId);
    dispatch(getMessage(_message));
    return;
    axios({
      method: "GET",
      url: "http://121.141.140.148:8088/chatRoom/create", // 요청 url 확인
      headers: {
        // "content-type": "applicaton/json;charset=UTF-8", 
        // "accept": "application/json", 
        'Authorization' : token},
      data: {
        'chatRoomId': roomId  // 전달 데이터 확인
      },
    })
    .then((res) => {
      console.log('채팅방 메시지 가져오기 성공 후 전달 데이터 ::', res);
      dispatch(getMessage(res.data)); 
    }).catch((err) => {
      console.log("채팅방 메시지 가져오는 중 오류 ::", err.response);
    })
    // const response = RESP.GET_MESSAGE;
    // console.log("getMessageDB : response", response);
    // dispatch(getMessage(response));
  }
}

// const addDmDB = (dm) => {
//   console.log('전달받은 dm 먼저 확인 ::', dm);
//   return function (dispatch, getState, { history }) {
//     dispatch(addDm(dm));
//     return;
//     apis
//       .addDm(dm)
//       .then((res) => {
//         console.log('dm 서버에 추가 성공후 전달 데이터 :: ', res);
//         dispatch(addDm(dm));
//       })
//       .catch((err) => {
//         console.log('dm 서버에 추가중 오류 발생 :: ', err);
//       });
//   };
// };

// 연결이후



  // const dispatch = useDispatch();
  // // 방 번호
  // const roomId = useParams();
  
  // let headers = {Authorization: sessionStorage.getItem(token)}

  // // 연결하고 구독하기
  
// const onConnected = () => {
//   client.subscribe("http://121.141.140.148:8088/topic/greetings", this.onMessageReceived);

//   client.send(
//     "http://121.141.140.148:8088/app/hello",
//     {},
//     JSON.stringify({ username: "USERNAME", type: "ENTER", message: '1234' })
//   );
// }

// // messageReceived
// const onMessageReceived = (payload) => {
//   console.log("onMessageReceived");
//   var message = JSON.parse(payload.body);
// }

// const subscription = client.subscribe('topic/greetings', (res) => {
//   console.log(res)
// })
//onError
// onError = (error) => {
//   this.setState({
//     error:
//       "Could not connect you to the Chat Room Server. Please refresh this page and try again!",
//   });
// };

//sendMessage
// sendMessage = (msg) => {
//   var messageContent = "test"
//   if (messageContent && stompClient) {
//     var chatMessage = {
//       sender: this.state.username,
//       content: "Heey there",
//       type: "CHAT",
//     };
//     stompClient.send(
//       "/app/hello",
//       {name: "Ali"},
//       JSON.stringify(chatMessage)
//     );
//   }
// };

// reducer
export default handleActions(
  {
      [SET_DM]: (state, action) => produce(state, (draft) => {
        draft.list = [...action.payload.dm_list];
      }),
      [ADD_DM]: (state, action) => produce(state, (draft) => {
        draft.list = [...draft.list, action.payload.dm]; 
      }),
      [ENTER_ROOM]: (state, action) => produce(state, (draft) => {
        draft.chatRoomId = action.payload.chatRoomId; 
      }),
      [GET_MESSAGE]: (state, action) => produce(state, (draft) => {
        console.log("GET_MESSAGE : message", action.payload.message);
        draft.roomMessage = action.payload.message;
        // draft.message.push(action.payload);
      }),
      [SEND_MESSAGE]: (state, action) => produce(state, (draft) => {
        console.log("SEND_MESSAGE : message", action.payload.message);
        // draft.messageList = action.payload.message;
        draft.messageList = [...draft.messageList, action.payload.message];
      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  setDm,
  addDm,
  createChatRoom,
  getChatRoom,
  enterRoom,
  sendMessage,
  getMessageDB,
  getMessage,
  // getDmDB,
  // addDmDB,
};

// export { active ,deactivate, getChatRoom ,createChatRoom, };

export { actionCreators, active ,deactivate, getChatRoom ,createChatRoom, }