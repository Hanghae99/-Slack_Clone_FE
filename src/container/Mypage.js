import React, { useState } from 'react'
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as imageActions } from "../redux/modules/image";

import CloseIcon from '@mui/icons-material/Close';

const Mypage = (props) => {
  console.log(props);
  const { onClose } = props;
  const dispatch = useDispatch();
  const fileInput = React.useRef();
  const preview = useSelector((state) => state.image.preview);

  const user = useSelector((state) => state.user.user);
  console.log('마이페이지에서 유저 확인 ::', user);

  const [nickname, setNickname] = React.useState(user.nickname);
  const changeNickname = (e) => {
    setNickname(e.target.value);
    console.log('변한값 확인 ::', e.target.value);
  }

  let file = {};
  const selectFile = (e) => {
    // input이 가진 files 객체 보기
    console.log(e.target.files);
    // 선택한 파일이 어떻게 저장되어 있나 보기
    console.log(e.target.files[0]);
    // ref로도 확인
    console.log(fileInput.current.files[0]);

    const reader = new FileReader();
    file = e.target.files[0];

    dispatch(imageActions.uploadImage(file));
    // 파일 내용을 읽어온다.
    reader.readAsDataURL(file);
    // 읽기가 끝나면 발생하는 이벤트 핸들러
    reader.onloadend = () => {
      console.log(reader.result); // 파일의 컨텐츠(내용물)
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const editUserInfo = () => {
    console.log(nickname)
    dispatch(userActions.editUserDB(nickname));
    console.log(nickname)

  }

  return (
      <ModalContainer>
        <ModalContents>
          <ModalTitle>
            <h1>내 프로필 편집</h1>
          </ModalTitle>
          <ModalInput>
            <div className='input_group'>
              <label>
                <span>이메일</span>
                <input type='text' value={user.email} disabled/>
              </label>
              <label>
                <span>닉네임</span>
                <input type='text' defaultValue={nickname} onChange={changeNickname}/>
                <div>이는 고객님의 이름이거나 Slack에서 불리고 싶은 별명일 수 있습니다.</div>
              </label>
              <label>
                <span>맡고 있는 일</span>
                <input className='no_change' type='text' placeholder='맡고 있는 일' disabled/>
                <div>고객님이 Slak에서 무엇을 하고 있는지 사람들에게 알려주세요.</div>
              </label>
              <label>
                <span>전화번호</span>
                <input className='no_change' type='text' placeholder='(123) 555-5555' disabled/>
                <div>전화번호를 입력하세요.</div>
              </label>
            </div>
            <div className='input_profile'>
              <div>프로필사진</div>
              <img src={preview ? preview : "https://user-images.githubusercontent.com/91959791/163972509-ca46de43-33cf-4648-a61d-47f32dfe20b3.png"}/>
              <Label className="input-file-button" htmlFor="input-image">
                사진업로드
              </Label>
              <input id='input-image' type="file" ref={fileInput} onChange={selectFile} style={{display:"none"}}/>
            </div>
          </ModalInput>
          <ModalFooter>
            <div className='text'>필드 추가, 편집 또는 다시 정렬</div>
            <div className='btn_group'>
              <button className='btn_cancel' onClick={()=>{
                onClose(false);
              }}>취소</button>
              <button className='btn_save' onClick={()=>{
                editUserInfo();
                onClose(false);
              }}>변경사항 저장</button>
            </div>
          </ModalFooter>
          <button className='btn_cancel' onClick={()=>{
                onClose(false);
              }}><CloseIcon/></button>
          
        </ModalContents>
      </ModalContainer>
  );
}

const ModalContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: relative;
  color: black;
  padding: 28px;
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  overflow: auto;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
`;

const ModalContents = styled.div`
  position: absolute;
  top: 55px;
  right: 75px;
  background-color: white; 
  max-width: 700px;
  max-height: 100%;
  height: auto;
  width: 100%;
  box-shadow: 0 0 0 1px #ccc; 
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  // overflow: hidden;
  overflow-x: auto;
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
  align-items: center;
  // min-height: 70px;
  padding: 20px 28px;
  h1 {
    font-size: 22px;
    font-weight: 900;
  }
`;
const ModalInput = styled.div`
  display: flex;
  padding: 0 28px;
  .input_group {
    flex: 1;
    margin-right: 32px;
    label {
      display: block;
      margin-bottom: 23px;
      .no_change {
        outline: none;
        background-color: #dfdfdf;
        color: gray;
      }
    }
    span {
      display: block;
      padding-bottom: 8px;
      font-size: 15px;
      font-weight: 700;
    }
    input {
      padding: 11px 12px 13px;
      font-size: 18px;
      border-radius: 4px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      width: 100%;
    }
    div {
      font-size: 13px;
      font-weight: 400;
      margin: 6px 0 20px;
      color: gray;
    }
  }
  .input_profile {
    div {
      display: block;
      padding-bottom: 8px;
      font-size: 15px;
      font-weight: 700;
    }
    img {
      border-radius: 4px;
      height: 192px;
      width: 192px;
      overflow: hidden;
      object-fit: cover;
    }
  }
`;

const Label = styled.label`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 8px auto;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    &:hover {
        cursor: pointer;
        box-shadow: 0 1px 4px rgb(0,0,0,0.3);
      }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px;
  .text {
    color: #1264a3;
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
  button {
    font-size: 15px;
    border-radius: 4px;
    font-weight: 900;
    outline: none;
    border: none;
    font-size: 15px;
    height: 36px;
    min-width: 80px;
    padding: 0 12px;
    cursor: pointer;
    :hover {
      box-shadow: 0 1px 4px rgb(0,0,0,0.3);
    }
  }
  .btn_cancel {
    border: 1px solid #ccc;
    margin-right: 12px;
    background-color: transparent;
  }
  .btn_save {
    background-color: #007a5a;
    color: white;
  }
`;

export default Mypage;