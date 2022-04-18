import React from 'react';
import styled from "styled-components";

const Message = (props) => {
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
            <input placeholder='내용을 입력해주세요.'/>
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
              <button>보내기</button>
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
  bottom: 46px;
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

export default Message;