import React from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as dmActions } from '../redux/modules/dm';

const SidebarMenu = ({ Icon, title, addOption, style }) => {

  const dispatch = useDispatch();

  const addMenu = () => {
    if (title === '채널 추가') {
      const channelName = prompt('생성할 채널 이름?');
      if (channelName) {
        console.log(`db에 채널 "${channelName}" 추가 요청`)
      }
    } else {
      const directUserName = prompt('새로운 다이렉트 메시지 상대를 입력해주세요 :)');
      if (directUserName) {
        console.log(`db에 다이렉트 메시지 상대 "${directUserName}" 추가 요청`)
        dispatch(dmActions.addDmDB(directUserName));
      }
    }
  };

  const selectMenu = () => {
    alert(title);
  };
  return (
    <React.Fragment>
      <SidebarMenuContainer
        onClick={addOption ? addMenu : selectMenu}
      >
        {Icon && <Icon fontSize='medium' style={style}/>}
        {Icon ? (
          <h3>{title}</h3>
        ) : (
          <ChannelMenu>
            <span>#</span> {title}
          </ChannelMenu>
        )}
      </SidebarMenuContainer>
    </React.Fragment>
  );
}

const SidebarMenuContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  cursor: pointer;
  margin-bottom: 5px;
  padding-left: 10px;
  > .MuiSvgIcon-root {
    padding-left: 15px;
    padding-right: 8px;
  }
  h3 {
    font-weight: 400;
    span {
      padding-left: 20px;
      padding-right: 8px;
    }
  }
  :hover {
    background-color: #1164A3;
    opacity: 0.9;
  }
`;

const ChannelMenu = styled.h3`
  margin-bottom: 3px;
  span {
    padding: 10px;
    margin-left: 2px;
  }
`;

export default SidebarMenu;