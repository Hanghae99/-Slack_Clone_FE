import React from 'react';
import styled from "styled-components";

const Mypage = (props) => {

  const { onClose } = props;

  return (
      <ModalContainer>
        <ModalContents>
          <ModalTitle>
            <h1>내 프로필 편집</h1>
          </ModalTitle>
          <ModalInput>
            <div className='input_group'>
              <label>
                <span>성명</span>
                <input type='text' placeholder='username' value='yesleee'/>
              </label>
              <label>
                <span>표시이름</span>
                <input type='text' placeholder='nickname' value='yesleee'/>
                <div>이는 고객님의 이름이거나 Slack에서 불리고 싶은 별명일 수 있습니다.</div>
              </label>
              <label>
                <span>맡고 있는 일</span>
                <input class='no_change' type='text' placeholder='맡고 있는 일' value='맡고 있는 일'/>
                <div>고객님이 Slak에서 무엇을 하고 있는지 사람들에게 알려주세요.</div>
              </label>
              <label>
                <span>전화번호</span>
                <input class='no_change' type='text' placeholder='(123) 555-5555' value='(123) 555-5555'/>
                <div>전화번호를 입력하세요.</div>
              </label>
            </div>
            <div className='input_profile'>
              <div>프로필사진</div>
              <img src='https://user-images.githubusercontent.com/91959791/162676899-be6a11b1-d103-4d57-89b8-34db876fad6f.png'/>
              <Label className="input-file-button" htmlFor="input-image">
                사진업로드
              </Label>
              <input id='input-image' type="file" style={{display:"none"}}/>
              {/* <input id='input-image' onChange={changeFile} type="file" ref={fileInput} disabled={is_uploading} style={{display:"none"}}/> */}
            </div>
          </ModalInput>
          <ModalFooter>
            <div className='text'>필드 추가, 편집 또는 다시 정렬</div>
            <div className='btn_group'>
              <button className='btn_cancel' onClick={()=>{
                onClose(false);
              }}>취소</button>
              <button className='btn_save' onClick={()=>{
                onClose(false);
              }}>변경사항 저장</button>
            </div>
          </ModalFooter>
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
  overflow: hidden;
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