import React, { useState } from 'react'
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as imageActions } from "../redux/modules/image";
import { actionCreators as userActions } from "../redux/modules/user";

import CloseIcon from '@mui/icons-material/Close';
import Mypage from '../container/Mypage';

const ProfileModal = (props) => {
  console.log(props);
  const { onClose } = props;
  const dispatch = useDispatch();

  // // const user = useSelector((state) => state.user.user);
  // // console.log('마이페이지에서 유저 확인 ::', user);

  // // const [nickname, setNickname] = React.useState(user.nickname);
  const [modal, handleModal] = useState(false);

  return (
      <ModalContainer>
        <ModalContents>
          <ModalTitle>
            <img src="https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png"/>
            {/* <img src={user.image ? user.image : "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png"}/> */}
            <div>
              {/* <div>{user.nickname}</div> */}
              <div className='username'>유저닉네임</div>
              <div className='status'>자리비움 / 대화가능</div>
            </div>
          </ModalTitle>
          <ModalOption>
            <div className='button'>
              <button onClick={() => {
              alert('준비중입니다 :)')
                onClose(false);
              }}>상태 업테이트</button>
            </div>
            <div className='menu' onClick={() => {
              alert('준비중입니다 :)')
              onClose(false);
            }}>자신을 자리 비움으로 설정</div>
            <div className='menu' onClick={() => {
              alert('준비중입니다 :)')
              onClose(false);
            }}>알림 일시 중지</div>
          </ModalOption>
          <hr/>
          <ModalFooter>
            <div className='menu' onClick={() => {
              handleModal(true);
              onClose(false);
            }}>프로필 변경</div>
            <div className='menu' onClick={() => {
              dispatch(userActions.logoutFB({}))
              onClose(false);
            }}>로그아웃</div>
          </ModalFooter>
          <button className='btn_cancel' onClick={()=>{
                onClose(false);
              }}><CloseIcon/></button>
          {modal && <Mypage onClose={handleModal}/>}          
        </ModalContents>
      </ModalContainer>
  );
}
const ModalContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
`;

const ModalContents = styled.div`
  position: absolute;
  top: 50px;
  right: 18px;
  width: 300px;
  background-color: white;
  box-shadow: 0 0 0 1px #ccc; 
  border-radius: 6px;
  margin: 0;
  padding: 12px 0;
  // overflow-y: auto;
  .menu {
    padding: 0 24px;
    line-height: 28px;
    margin: 0;
    :hover {
      cursor: pointer;
      background-color: #1164A3;
      color: white;
    }
  }
  hr {
    line-height: 24px;
    margin: 8px 0;
    border: 0.5px solid rgba(0,0,0,0.1);
  }
  > .btn_cancel {
    position: absolute;
    width: 36px;
    height: 36px;
    right: 20px;
    top: 20px;
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

const ModalTitle = styled.div`
  width: 100%;
  padding: 8px 20px 12px 24px;
  display: flex;
  align-items: center;
  img {
    border-radius: 4px;
    height: 36px;
    width: 36px;
  }
  > div {
    margin-left: 12px;
    .username {
      font-size: 15px;
      font-weight: 900;
    }
    .status {
      display: flex;
      font-size: 13px;
      padding: 2px 0 0;
    }
  }
`;
const ModalOption = styled.div`
  display: flex;
  flex-direction: column;
  .button {
    padding: 0 24px 8px;
    button {
      width: 100%;
      padding: 7px;
      display: flex;
      align-items: center;
      border-radius: 4px;
      justify-content: center;
      cursor: pointer;
      border: none;
      background-color: white;
      color: #1d1c1d;
      border: 1px solid #dfdfdf;

    }
  }
`;

const ModalFooter = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
`;

export default ProfileModal;