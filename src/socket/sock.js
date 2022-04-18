import SockJS from 'sockjs-client';
import StompJs from '@stomp/stompjs';

const client = new StompJs.Client({
  brokerURL: 'ws://local.corsmarket.ml/api/ws',
  connectHeaders: {
    login: 'user',
    passcode: 'password',
  },
  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

client.onConnect = function (frame) {
  // Do something, all subscribes must be done is this callback
  // This is needed because this will be executed after a (re)connect
};
client.onStompError = function (frame) {
  // Will be invoked in case of error encountered at Broker
  // Bad login/passcode typically will cause an error
  // Complaint brokers will set `message` header with a brief message. Body may contain details.
  // Compliant brokers will terminate the connection after any error
  console.log('Broker reported error: ' + frame.headers['message']);
  console.log('Additional details: ' + frame.body);
};

client.activate();

// 연결 해제
// client.deactivate();

//브라우저 미지원 대응
// if (typeof WebSocket !== 'function') {
//   client.webSocketFactory = function () {
//     return new SockJS('http://localhost:15674/stomp');
//   };
// }

client.publish({
  destination: '/topic/general',
  body: 'Hello world',
  headers: { priority: '9' },
});

// 바이너리데이터보내기
// const binaryData = generateBinaryData();
// client.publish({
//   destination: '/topic/special',
//   binaryBody: binaryData,
//   headers: { 'content-type': 'application/octet-stream' },
// });

const subscription = client.subscribe('/queue/test', callback);