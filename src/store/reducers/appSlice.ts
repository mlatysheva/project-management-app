import { createSlice } from "@reduxjs/toolkit";

export interface AppProps {
  isBoardInEdit: boolean,
  editedBoardId: string,
  isBoardInCreate: boolean,
  createdBoardId: string,
}

const initialState: AppProps =
  {
    isBoardInEdit: false,
    editedBoardId: '',
    isBoardInCreate: false,
    createdBoardId: '',
  }


export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    set_editedBoard: (state: AppProps = initialState, action) => {
      const newState = {
        ...state,
        isBoardInEdit: action.payload.isBoardInEdit,
        editedBoardId: action.payload.editedBoardId,
      }
      return newState;
    },
    remove_editedBoard: (state: AppProps) => {
      const newState = {
        ...state,
        isBoardInEdit: false,
        editedBoardId: '',
      }
      return newState;
    },
    set_createdBoard: (state: AppProps = initialState, action) => {
      console.dir(action);
      const newState = {
        ...state,
        isBoardInCreate: action.payload.isBoardInCreate,
        createdBoardId: action.payload.createdBoardId,
      }
      return newState;
    },
    remove_createdBoard: (state: AppProps) => {
      const newState = {
        ...state,
        isBoardInCreate: false,
        createdBoardId: '',
      }
      return newState;
    }
  } 
});

export const { set_editedBoard, remove_editedBoard, set_createdBoard, remove_createdBoard } = appSlice.actions;

export default appSlice.reducer;