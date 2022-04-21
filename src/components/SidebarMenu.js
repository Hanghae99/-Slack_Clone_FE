import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as dmActions } from "../redux/modules/dm";
import { getChatRoom, createChatRoom } from "../redux/modules/sock";
import { actionCreators as sockActions } from '../redux/modules/sock';
import { history } from '../redux/ConfigStore';
import InviteModal from "./InviteModal";



const SidebarMenu = ({ Icon, title, roomId, addOption, style }) => {


  const dispatch = useDispatch();
  const [modal, handleModal] = React.useState(false);

  const addMenu = () => {
    if (title === "채널 추가") {
      handleModal(true);
      // const channelName = prompt("생성할 채널 이름?");
      // if (channelName) {
      //   console.log(`db에 채널 "${channelName}" 추가 요청`);
      // }
    } else {

      handleModal(true);
      // const createRoom = prompt("새로운 방 이름을 입력해 주세요!");
      // if (createRoom) {
      //   dispatch(sockActions.createChatRoom(createRoom));
      // }
    }
  };

  const selectMenu = () => {
    if (roomId) {
      dispatch(sockActions.enterRoom(roomId));
      history.push(`/slack/${roomId}`);
    }
  };
  return (
    <React.Fragment>
      <SidebarMenuContainer onClick={addOption ? addMenu : selectMenu}>
        {Icon && <Icon fontSize="medium" style={style} />}
        {Icon ? (
          <h3>{title}</h3>
        ) : (
          <ChannelMenu>
            <span>#</span> {title}
          </ChannelMenu>
        )}
      </SidebarMenuContainer>

      {modal && <InviteModal onClose={handleModal}/>}
    </React.Fragment>
  );
};

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
    background-color: #1164a3;
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
