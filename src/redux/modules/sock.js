import React from 'react';
import ReactDOM from 'react-dom';
import { CoPresent } from '@mui/icons-material';
import axios from 'axios';

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
        appendChatRoom(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};
const appendChatRoom = (chatRoomData) => {
  console.log(chatRoomData);
  const chatSelection = document.getElementById("create");
  for(let i=0; i<chatRoomData.data.length; i++){
    let chatRoomId = chatRoomData.data[i]['chatRoomId'];
    let chatRoomName = chatRoomData.data[i]['chatRoomName'];
    let chatRoom = `<div id="${chatRoomId}" onclick="location.href='/chat/${chatRoomId}'">
        ${chatRoomName}
    </div>`;
    chatSelection.append(chatRoom);
    // ReactDOM.render(chatRoom,  document.getElementById("create"))

  }
};

const createChatRoom = (createRoom) => {
  axios({
    method: "POST",
    url: "/chatRoom/create",
    params: {
      chatRoomName: createRoom
    },
  })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};


//연결이후
// onConnected = () => {
//   console.log("onConnected");
//   // Subscribe to the Public Topic
//   stompClient.subscribe("/topic/public", this.onMessageReceived);

//   // Tell your username to the server
//   stompClient.send(
//     "/api/chat/addUser/1",
//     {},
//     JSON.stringify({ sender: "Ali", type: "JOIN" })
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
//       "/api/chat/sendMessage/1",
//       {name: "Ali"},
//       JSON.stringify(chatMessage)
//     );
//   }
// };

export { active ,deactivate, getChatRoom ,createChatRoom, };
