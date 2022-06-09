import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { commentApi } from "services/postApi";

interface Comment {
  _id: String;
  content: String;
}
interface CommentState {
  comments: {
    [key: string]: Comment[];
  };
}

interface Payload {
  postId: string;
  data: Comment[];
}

const initialState: CommentState = {
  comments: {},
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    getListComments: (state, action: PayloadAction<Payload>) => {
      state.comments = {
        ...state.comments,
        [action.payload.postId]: action.payload.data,
      };
    },
    addComment: (
      state,
      action: PayloadAction<{
        comment: Comment;
        postId: string;
        isDone?: boolean;
      }>
    ) => {
      if (!action.payload.isDone) {
        state.comments[action.payload.postId] = [
          action.payload.comment,
          ...state.comments[action.payload.postId],
        ];
      } else {
        // const list = state.comments[action.payload.postId].filter(
        //   (i) => i._id !== ""
        // );
        // state.comments[action.payload.postId] = [
        //   action.payload.comment,
        //   ...list,
        // ];
      }
    },
  },
});

export const commentAction = commentSlice.actions;
export const commentReducer = commentSlice.reducer;

export const getCommentByPostId =
  (dispatch: Dispatch) => async (postId: string) => {
    try {
      const reponse = await commentApi.getComment(postId, 0, 5);
      if (reponse.status === 200) {
        dispatch(
          commentAction.getListComments({ postId: postId, data: reponse.data })
        );
      } else {
        dispatch(commentAction.getListComments({ postId: postId, data: [] }));
      }
    } catch (err) {
      console.log(err);
    }
  };
