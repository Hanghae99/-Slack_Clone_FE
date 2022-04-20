import React from 'react';
import styled from 'styled-components';

const ChatItem = (props) => {

  const {message,username} = props;

  return (
    <React.Fragment>

          <ChatItemContainer>
            <div className='chat_profile'>
              <button>img</button>
            </div>
            <div className='chat_text' id="text">
              <div className='chat_info'>
                <span className='chat_user'>{username}</span>
                {/* <span className='chat_time'>{roomName} 방 chatTime</span> */}
              </div>
              <div className='chat_content'>{message}</div>
            </div>
          </ChatItemContainer>
      {/* <ChatItemContainer>
        <img src={userImage} alt=''/>
        <ChatInfo>
          <div>
            {user} <span className='chat_time'>{timestamp}</span>
          </div>
          <p>{chat}</p>
        </ChatInfo>

      </ChatItemContainer> */}
    </React.Fragment>
  );
}

const ChatItemContainer = styled.div`
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
// const ChatItemContainer = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 20px;

//   > img {
//     height: 50px;
//     border-radius: 8px;
//   }
// `;
// const ChatInfo = styled.div`
//   padding-left: 10px;
//   > div > span {
//     color: gray;
//     font-weight: 300;
//     margin-left: 4px;
//     font-size: 10px;
//   }
// `;

export default ChatItem;