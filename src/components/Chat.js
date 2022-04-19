import React from 'react';
import styled from "styled-components";
import AddIcon from '@mui/icons-material/Add';

const Chat = () => {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let time = `${hours}:${minutes}`

  // const title = document.location.search();
  return (
    <React.Fragment>
      <ChatHeader>
        <div className='channel_name'>이름</div>
        <div>
          <button>members</button>
        </div>
      </ChatHeader>
      <Bookmarks>
        <div>
          <button>
            <AddIcon/>책갈피추가
          </button>
        </div>
      </Bookmarks>
      <ChatList>
        <ChatItem>
          <div className='chat_profile'>
            <button>img</button>
          </div>
          <div className='chat_text'>
            <div className='chat_info'>
              <span className='chat_user'>username</span>
              <span className='chat_time'>chatTime</span>
            </div>
            <div className='chat_content'>chatting</div>
          </div>
        </ChatItem>
        <ChatItem>
          <div className='chat_profile'>
            <button>img</button>
          </div>
          <div className='chat_text'>
            <div className='chat_info'>
              <span className='chat_user'>username</span>
              <span className='chat_time'>{time}</span>
            </div>
            <div className='chat_content'>chatting</div>
          </div>
        </ChatItem>
      </ChatList>
    </React.Fragment>
  );
}

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
`;

const ChatItem = styled.div`
  padding: 8px 20px;
  display: flex;
  .chat_profile {
    margin-right: 8px;
    button {
      height: 36px;
      width: 36px;
    }
  }
  .chat_text {
    display: flex;
    flex-direction: column;
    // padding: 8px;

    .chat_info {
      .chat_user {
        font-weight: 700;
        font-size: 15px;
        margin-right: 10px;
      }
      .chat_time {
        font-size: 12px;
        color: gray;
      }
    }

    .chat_content: {
      // margin-bottom: 4px;
      font-size: 15px;
    }
    
  }
`;
export default Chat;