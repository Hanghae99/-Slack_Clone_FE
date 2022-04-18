import React from 'react';
import styled from "styled-components";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


const Header = (props) => {

  return (

    <React.Fragment>
      <HeaderContainer>
        <SideHeader>
          {/* add onClick function - 추가기능 */}
          <AccessTimeIcon/>
        </SideHeader>

        <FakeInput>
          <button>
            <SearchIcon/>SLACK 검색
          </button>
        </FakeInput>

        {/* <Profile>
          add onClick function 
          - profile img / userId / active-status
          - '자신을 활성(자리비움)으로 설정'
          - 알림일시 중지
          - 프로필편집 : id(계정) / 닉네임(변경가능;중복체크) / 칭호 / 프로필사진(준비중)
          - 로그아웃  </div>
          <AccountBoxIcon onClick={()=>{handleModal(true);}}/>
        </Profile>

        {modal && <Mypage onClose={handleModal}/>} */}
      </HeaderContainer>
    </React.Fragment>
  );
}

Header.defaultProps = {
};

const HeaderContainer = styled.div`
  display: flex;
  // flex: 1;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  // padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;

const SideHeader = styled.div`
  flex: 0.25;
  // flex-grow: 0;
  display: flex;
  align-items: flex-end; 
  // align-items: center; 
  justify-content: center;
  padding: 0 16px;
  > .MuiSvgIcon-root {
    margin-left: auto;
    font-size: 20px;
    margin-right: 10px;
  }
`;

const FakeInput = styled.div`
  flex: 0.5;
  // flex-grow: 2;
  margin-right: auto;
  button {
    width: 100%;
    max-width: 732px;
    margin: 9px 0;
    padding: 4px 8px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255,255,255,0.2);
    outline: none;
    border: none;
    color: white;
    > .MuiSvgIcon-root {
      font-size: 18px;
      margin-right: 8px;
    }
  }
`;

const Profile = styled.div`
  flex: 0.25;
  display: flex; 
  align-items: center; 
  justify-content: flex-end;
  flex-grow: 0;
  padding: 0 16px;
  > .MuiSvgIcon-root {
    font-size: 36px;
  }
`;

export default Header;