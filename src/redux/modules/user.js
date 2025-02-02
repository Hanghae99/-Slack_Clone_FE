import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, deleteCookie } from "../../shared/Cookie";
import axios from "axios";
import { apis } from "../../shared/api";

import {active2,deactivate,getChatRoom} from './sock'
import { actionCreators as imageActions } from "./image";

// const nickname = sessionStorage.getItem('user_id');

// const Stomp = require('@stomp/stompjs');

// const client = new Stomp.Client({
//   brokerURL: 'http://121.141.140.148:8088/gs-guide-websocket',
//   connectHeaders: {
//     nickname : nickname,
//   },
//   debug: function (str) {
//     console.log(str);
//   },
//   reconnectDelay: 5000,
//   heartbeatIncoming: 4000,
//   heartbeatOutgoing: 4000,
// });
// const active = () => {
//   client.onConnect = function (frame) {
//     // Do something, all subscribes must be done is this callback
//     // This is needed because this will be executed after a (re)connect
//   };
//   client.onStompError = function (frame) {
//     // Will be invoked in case of error encountered at Broker
//     // Bad login/passcode typically will cause an error
//     // Complaint brokers will set `message` header with a brief message. Body may contain details.
//     // Compliant brokers will terminate the connection after any error
//     console.log('Broker reported error: ' + frame.headers['message']);
//     console.log('Additional details: ' + frame.body);
//   };
// const nickname = sessionStorage.getItem('');

const Stomp = require('@stomp/stompjs');

const client = new Stomp.Client({
  brokerURL: 'ws://local.corsmarket.ml/api/ws',
  connectHeaders: {
    login: 'user',
    passcode: 'password',
  },
  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});
const active = () => {
  client.onConnect = function (frame) {
    // Do something, all subscribes must be done is this callback
    // This is needed because this will be executed after a (re)connect
  };
  client.onStompError = function (frame) {
    // Will be invoked in case of error encountered at Broker
    // Bad login/passcode typically will cause an error
    // Complaint brokers will set `message` header with a brief message. Body may contain details.
    // Compliant brokers will terminate the connection after any error
    console.log('Broker reported error: ' + frame.headers['message']);
    console.log('Additional details: ' + frame.body);
  };
  
  client.activate();
}

//actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
const EDIT_USER = "EDIT_USER";
const GET_USER_LIST = 'GET_USER_LIST';

// action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUserList = createAction(GET_USER_LIST, (user_list) => ({ user_list }));
// const editUser = createAction(EDIT_USER, (nickname, image_url) => ({ nickname, image_url }));

//initialState
const initialState = {
  user: null,
  is_login: false,
};

//middleware actions
const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
        url: "http://121.141.140.148:8088/user/login",
        data: {
          username : id,
          password : pwd,
        },
      }).then((res) => {
        
        console.log('로그인 성공 후 가져온 데이터 ::',res);
        sessionStorage.setItem("user_id", res.data.nickName);
        sessionStorage.setItem("token", res.headers.authorization);
        const token = res.headers.authorization;
        // active();
        // const accessToken = res.data.token;
        // setCookie("is_login", `${accessToken}`);
        dispatch(
          setUser({
            // email: res.data.email,
            email: id,
            nickname: res.data.nickName,
            image: res.data.image
          })
        );
      }).catch(err =>{
        console.log(err);
        throw new Error(err);
      });
  };
};

const signupFB = (id, password, nickname) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: "http://121.141.140.148:8088/user/signup",
      data: {
        userEmail: id,
        password: password,
        userName: nickname,
      },
    })
      .then((res) => {
        console.log(typeof(res.data.errMsg));
        if( typeof(res.data.errMsg) !== typeof(string)){
          alert(res.data.errMsg);
          return null;
        } else {
          console.log(res);
          alert('회원가입이 완료되었습니다.');
          history.push('/signin');
        }
        // sessionStorage.setItem("user_id", id);
        // dispatch(setUser({nickname: nickname, id: id, user_profile: ''}));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const getUserDB = () => {
  return function (dispatch, getState, { history }) {
    // // 테스트용 : 나중에 삭제
    // const new_user = {
    //   email: 'yesleee@naver.com', 
    //   nickname: 'GetUser',
    //   image: null,
    // }
    // dispatch(setUser(new_user));
    // return;

    apis
      .getUser()
      .then((res) => {
        console.log('서버로부터 User 데이터 가져옴 :: ', res);
        const new_user = {
          email: res.data.userEmail,
          nickname: res.data.userName,
          image: res.data.imageUrl,
        }
        console.log(new_user);
        dispatch(setUser(new_user));
      })
      .catch((err) => {
        console.log('User 데이터 가져오는 중 오류 발생 :: ', err);
      });
  };
};

const editUserDB = (nickname) => {
  return function (dispatch, getState, { history }) {

    const _file = getState().image.file;
    const _image = getState().image.preview;
    const _user = getState().user.user;

    console.log('들어온 nickname ::', nickname);
    console.log('기존 유저정보 ::', _user.email);
    console.log('업로드된 파일 정보 ::', _file);
    console.log('업로드된 파일 url ::', _image);
        
    const formData = new FormData();
    // if (_file) {
      formData.append("file", _file);
    
    formData.append("userName", nickname);
    formData.append("userEmail", _user.email);
    // formData.append(
    //   "userName",
    //   new Blob([JSON.stringify(nickname)], { type: "application/json" })
    // );
    // formData.append(
    //   "userEmail",
    //   new Blob([JSON.stringify(_user.email)], { type: "application/json" })
    // );
    // for (let value of formData.values()) {
    //   console.log(value);
    // }
    // console.log('formData 확인 ::', formData.values());
    apis
      .editUser(formData)
      .then((res) => {
        console.log('user 정보 수정 뒤 서버로부터 받은 데이터 :: ', res);
        const new_user = {
          email: _user.email,
          nickname: nickname,
          image: _image,
        }

        // sessionStorage.setItem("user_id", id);
        dispatch(setUser(new_user));
      })
      .catch((err) => {
        console.log('user 정보 수정 중 오류 발생 :: ', err);
      });

  };
};

const getUserListDB = () => {
  return function (dispatch, getState, { history }) {
    apis.getUserList()
      .then((res) => {
        console.log(res.data);
        dispatch(getUserList(res.data));
      }).catch((err) => {
        console.log(err.response);
      })
  }
}

const logoutFB = (id) => {
  return function (props, dispatch, {history}) {
    dispatch(logOut());
    sessionStorage.clear();
    deactivate();
    history.push("/signin");
  };
};

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
        console.log(draft.user, action.payload.user);
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
    [GET_USER_LIST]: (state, action) => produce(state, (draft) => {
      console.log(action.payload.user_list);
      draft.user_list = action.payload.user_list;
    }),
    // [EDIT_USER]: (state, action) => produce(state, (draft) => {
    //     draft.user = null;
    //     draft.is_login = false;
    //   }),
  },
  initialState
);

//action creator export
const actionCreators = {
  logOut,
  getUser,
  setUser,
  getUserList,
  // editUser,
  signupFB,
  loginFB,
  getUserDB,
  logoutFB,
  editUserDB,
  getUserListDB,
};

export { actionCreators }