import React from 'react';
import styled from 'styled-components';

const ChatItem = ({chat, timestamp, user, userImage}) => {
  return (
    <React.Fragment>
    {/* <div className='chat_profile'>
      <button>img</button>
    </div>
    <div className='chat_text'>
      <div className='chat_info'>
        <span className='chat_user'>{roomName} 방 username</span>
        <span className='chat_time'>{roomName} 방 chatTime</span>
      </div>
      <div className='chat_content'>{roomName} 방 chatting</div>
    </div> */}
      <ChatItemContainer>
        <img src={userImage} alt=''/>
        <ChatInfo>
          <div>
            {user} <span className='chat_time'>{timestamp}</span>
          </div>
          <p>{chat}</p>
        </ChatInfo>

      </ChatItemContainer>
    </React.Fragment>
  );
}

const ChatItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  > img {
    height: 50px;
    border-radius: 8px;
  }
`;
const ChatInfo = styled.div`
  padding-left: 10px;
  > div > span {
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
`;

export default ChatItem;