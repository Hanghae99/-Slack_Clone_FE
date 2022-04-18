o

//connect
connect = (userId) => {
  if (userId) {
    var socket = new SockJS("http://localhost:1981/ws");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, this.onConnected, this.onError);
  }
}

//after connect
onConnected = () => {
  console.log("onConnected");
  // Subscribe to the Public Topic
  stompClient.subscribe("/topic/public", this.onMessageReceived);

  // Tell your username to the server
  stompClient.send(
    "/api/chat/addUser/1",
    {},
    JSON.stringify({ sender: "Ali", type: "JOIN" })
  );
}

//messageReceived
onMessageReceived = (payload) => {
  console.log("onMessageReceived");
  var message = JSON.parse(payload.body);
}

//onError
onError = (error) => {
  this.setState({
    error:
      "Could not connect you to the Chat Room Server. Please refresh this page and try again!",
  });
};

//sendMessage
sendMessage = (msg) => {
  var messageContent = "test"
  if (messageContent && stompClient) {
    var chatMessage = {
      sender: this.state.username,
      content: "Heey there",
      type: "CHAT",
    };
    stompClient.send(
      "/api/chat/sendMessage/1",
      {name: "Ali"},
      JSON.stringify(chatMessage)
    );
  }
};

