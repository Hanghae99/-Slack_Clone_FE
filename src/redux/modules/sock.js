import React from 'react';
import ReactDOM from 'react-dom';
import { CoPresent } from '@mui/icons-material';
import axios from 'axios';

// - 리덕스
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const SET_DM = "SET_DM"; 
const ADD_DM = "ADD_DM"; 

const setDm = createAction(SET_DM, (dm_list) => ({dm_list}));
const addDm = createAction(ADD_DM, (dm) => ({dm}));

const initialState = {
  list: [],
}
// - 여기까지

const nickname = sessionStorage.getItem("user_id");
const token = sessionStorage.getItem("token");

const Stomp = require("@stomp/stompjs");

const client = new Stomp.Client({
  brokerURL: "http://121.141.140.148:8088/gs-guide-websocket",
  connectHeaders: {
    nickname: nickname,
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
    .then((response) => {
        // console.log(response.data.data[0]);
        // appendChatRoom(response);
        const _list = response.data;
        console.log(_list);
        dispatch(setDm(_list));
    })
    .catch(function(error) {
      console.log(error);
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


//연결이후
// onConnected = () => {
//   console.log("onConnected");
//   // Subscribe to the Public Topic
//   stompClient.subscribe("/topic/public+ROOMID", this.onMessageReceived);

//   // Tell your username to the server
//   stompClient.send(
//     "/api/chat/addUser/1",
//     {},
//     JSON.stringify({ USERNAME: "USERNAME", type: "ENTER" })
//   );
// }

// //messageReceived
// onMessageReceived = (payload) => {
//   console.log("onMessageReceived");
//   var message = JSON.parse(payload.body);
// }

// //onError
// onError = (error) => {
//   this.setState({
//     error:
//       "Could not connect you to the Chat Room Server. Please refresh this page and try again!",
//   });
// };

// //sendMessage
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
        console.log(draft.list);
      }),
      [ADD_DM]: (state, action) => produce(state, (draft) => {
        draft.list = [...draft.list, action.payload.dm]; 
      })
  },
  initialState
);

// action creator export
const actionCreators = {
  setDm,
  addDm,
  createChatRoom,
  getChatRoom,
  // getDmDB,
  // addDmDB,
};

// export { active ,deactivate, getChatRoom ,createChatRoom, };

export { actionCreators, active ,deactivate, getChatRoom ,createChatRoom, };