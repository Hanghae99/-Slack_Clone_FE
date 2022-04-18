import React from 'react';
import styled from "styled-components";

import SidebarMenu from "./SidebarMenu";

import MessageIcon from '@mui/icons-material/Message';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';

const Sidebar = (props) => {

  return (
    <React.Fragment>
      <SidebarContainer>
        <SidebarHeader>
        {/* add onClick function - 추가기능
          <div>Slack info 
            - '현재 워크스페이스는 'Slack'의 클론코딩 페이지 입니다' 
            - 슬랙으로 가기
            - 초대 링크 복사
            - 로그아웃 </div> */}
          <h2>Slack</h2>
          <button>
            <MessageIcon/>
          </button>
        </SidebarHeader>

        <SidebarOption>
          <MoreVertIcon />
          <h3>더 보기</h3>
        </SidebarOption>

        <ChannelGroup>
          <div className='channel_header'>
            <ArrowDropDownIcon />
            <h3>채널</h3>
          </div>
          <SidebarMenu title='채널이름'/>
          <SidebarMenu addOption Icon={AddIcon} title='채널 추가'/>
        </ChannelGroup>
        
        <DirectGroup>
          <div className='direct_header'>
            <ArrowDropDownIcon />
            <h3>다이렉트 메시지</h3>
          </div>
          <SidebarMenu Icon={AccountBoxIcon} title='유저이름'/>
          <SidebarMenu addOption Icon={AddIcon} title='팀원 추가'/>
          
        </DirectGroup>
      </SidebarContainer>
      {/* <div>sidebar 숨기기</div> */}
    </React.Fragment>
  );
}

const SidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.25;
  width: 100%;
  max-width: 260px;
  margin-top: 44px;
  border-top: 1px solid #49274b;
  box-sizing: border-box;
`

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 8px 15px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  h2 {
    font-size: 22px;
    font-weight: 700;
  }
  button {
    height: 34px;
    width: 34px;
    outline: none;
    border: none;
    border-radius: 34px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    > .MuiSvgIcon-root {
      color: #49274b;
      font-size: 18px;
    }
  }  
`;

const SidebarOption = styled.div`
  display: flex;
  padding: 5px 0;
  align-items: center;
  font-size: 13px;
  cursor: pointer;
  margin-bottom: 15px;
  > .MuiSvgIcon-root {
    padding-left: 15px;
    padding-right: 8px;
    font-size: medium;
  }
  h3 {
    font-weight: 400;
  }
  :hover {
    background-color: #1164A3;
    opacity: 0.9;
  }
`;

const ChannelGroup = styled.div`
  .channel_header {
    display: flex;
    padding: 5px 0;
    align-items: center;
    font-size: 13px;
    cursor: pointer;
    margin: 10px 0;
    > .MuiSvgIcon-root {
      padding-left: 15px;
      padding-right: 8px;
      font-size: large;
    }
    h3 {
      font-weight: 400;
    }
  }
`;

const DirectGroup = styled.div`
  .direct_header {
    display: flex;
    padding: 5px 0;
    align-items: center;
    font-size: 13px;
    cursor: pointer;
    margin: 10px 0;
    > .MuiSvgIcon-root {
      padding-left: 15px;
      padding-right: 8px;
      font-size: large;
    }
    h3 {
      font-weight: 400;
    }
  }
`;

export default Sidebar;