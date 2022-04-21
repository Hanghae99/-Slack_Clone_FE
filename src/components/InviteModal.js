import React, { useState } from 'react'
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as sockActions } from '../redux/modules/sock';

import CloseIcon from '@mui/icons-material/Close';

const InviteModal = (props) => {
  console.log(props);
  const { onClose } = props;

  const dispatch = useDispatch();

  const [room, setRoom] = React.useState('');
  const roomName = React.useRef(null);

  // const user = useSelector((state) => state.user.user);
  // console.log('모달창에서 유저 확인 ::', user);

  React.useEffect(() => {
    dispatch(userActions.getAllUserDB())
  }, []);

  const invite = () => {
    if(room) {
      dispatch(sockActions.createChatRoom(room));
      setRoom('');
      onClose(false);
    }
  }

  return (
      <ModalContainer>
        <ModalContents>
          <h3>메시지 상대 추가</h3>
          <div className='input_box'>
            <input value={room} placeholder='추가할 상대를 입력하세요.' onChange={(e)=>{setRoom(e.target.value)}}/>
            <button onClick={invite}>추가</button>
          </div>
          <UserList>
            {/* <div>
              <img src=''/>
              <div></div>
            </div> */}
          </UserList>
          <button className='btn_cancel' onClick={()=>{
                onClose(false);
              }}><CloseIcon/></button>
        </ModalContents>
      </ModalContainer>
  );
}

const ModalContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
`;

const ModalContents = styled.div`
  position: absolute;
  top: 100px;
  right: 0;
  left: 0;
  margin: auto;
  width: 300px;
  background-color: white;
  color: black;
  box-shadow: 0 0 0 1px #ccc; 
  border-radius: 6px;
  padding: 20px;
  > h3 {
    font-size: 22px;
    font-weight: 900;
    margin-bottom: 10px;
    margin-left: 5px;
  }
  > .input_box {
    border: 1px solid #dfdfdf;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    input {
      border: none;
      outline: none;
      width: 100%;
      padding: 10px;
    }
    > button {
      border: none;
      outline: none;
      width: auto;
      height: auto;
      background-color: transparent;
      word-break: keep-all;
      margin-right: 5px;
      // color: var(--slack-color);
      font-weight: 700;
      cursor: pointer;
      :hover {
        color: var(--slack-color);
        // background-color: rgba(0,0,0,0.1);
      }
    }
  }
  > .btn_cancel {
    position: absolute;
    width: 36px;
    height: 36px;
    right: 15px;
    top: 15px;
    z-index: 1;
    border: none;
    border-radius: 4px;
    outline: none;
    background-color: transparent;    
    cursor: pointer;
    display: inline-flex;  
    align-items: center;
    justify-content: center;
    :hover {
      background-color: rgba(0,0,0,0.1);    
    }
    > .MuiSvgIcon-root {
        color: gray;
        font-size: 20px;
      }
  }

`;
// const ModalContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   // align-items: center;
// `;

const UserList = styled.div`

`;

export default InviteModal;