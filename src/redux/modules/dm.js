import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

const SET_DM = "SET_DM"; 
const ADD_DM = "ADD_DM"; 

const setDm = createAction(SET_DM, (dm_list) => ({dm_list}));
const addDm = createAction(ADD_DM, (dm) => ({dm}));

const initialState = {
  list: [],
}

// middleware
const getDmDB = () => {
  return function (dispatch, getState, { history }) {
    console.log('getDmDB 연결 완료!!');
    const list = ['테스트1', '테스트2', '테스트3']
    dispatch(setDm(list));
    return;
    apis
      .getDm()
      .then((res) => {
        console.log('dm list 서버로부터 받은 데이터 :: ', res);
        dispatch(setDm(res.data));
      })
      .catch((err) => {
        console.log('dm list 서버에서 가져오는데 오류 발생 :: ', err);
      });
      
  };
};

const addDmDB = (dm) => {
  console.log('전달받은 dm 먼저 확인 ::', dm);
  return function (dispatch, getState, { history }) {
    dispatch(addDm(dm));
    return;
    apis
      .addDm(dm)
      .then((res) => {
        console.log('dm 서버에 추가 성공후 전달 데이터 :: ', res);
        dispatch(addDm(dm));
      })
      .catch((err) => {
        console.log('dm 서버에 추가중 오류 발생 :: ', err);
      });
  };
};


// reducer
export default handleActions(
  {
      [SET_DM]: (state, action) => produce(state, (draft) => {
        draft.list = [...action.payload.dm_list];
      }),
      [ADD_DM]: (state, action) => produce(state, (draft) => {
        draft.list = [...draft.list, action.payload.dm]; 
      })
  },
  initialState
);

// action creator export
const actionCreators = {
  setDm,
  addDm,
  getDmDB,
  addDmDB,
};

export { actionCreators };