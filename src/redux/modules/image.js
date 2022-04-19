import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// actions
const UPLOADING = "UPLOADING"; // 업로드 중인지, 아닌지 알게해주는 액션
const UPLOAD_IMAGE = "UPLOAD_IMAGE"; // 업로드한 이미지의 URL을 저장하는 액션
const SET_PREVIEW = "SET_PREVIEW"; // 미리보기 정보 가져오는 액션

// action creators
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (file) => ({ file }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

// initial state
const initialState = {
  image_url: "",
  file: null,
  uploading: false,
  preview: null,
};

// middleware

// reducer
export default handleActions(
  {
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.file = action.payload.file;
        draft.uploading = false;
        console.log(draft.file);
      }),

    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [SET_PREVIEW]: (state, action) =>
    produce(state, (draft) => {
      draft.preview = action.payload.preview;
    }),
  },
  initialState
);

const actionCreators = {
  uploadImage,
  setPreview,
};

export { actionCreators };