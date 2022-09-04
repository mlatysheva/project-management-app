import { createSlice } from "@reduxjs/toolkit";

export interface AppProps {
  isBoardInEdit: boolean,
  editedBoardId: string,
  editedBoardTitle?: string,
  editedBoardDescription?: string,
  isBoardInCreate: boolean,
  createdBoardId: string,
  createdBoardTitle?: string,
  createdBoardDescription?: string,
}

const initialState: AppProps =
  {
    isBoardInEdit: false,
    editedBoardId: '',
    editedBoardTitle: '',
    editedBoardDescription: '',
    isBoardInCreate: false,
    createdBoardId: '',
    createdBoardTitle: '',
    createdBoardDescription: '',
  }


export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    set_editedBoard: (state: AppProps = initialState, action: { payload: any }) => {
      const newState = {
        ...state,
        isBoardInEdit: action.payload.isBoardInEdit,
        editedBoardId: action.payload.editedBoardId,
        editedBoardTitle: action.payload.editedBoardTitle,
        editedBoardDescription: action.payload.editedBoardDescription,
      }
      return newState;
    },
    remove_editedBoard: (state: AppProps) => {
      const newState = {
        ...state,
        isBoardInEdit: false,
        editedBoardId: '',
        editedBoardTitle: '',
        editedBoardDescription: '',
      }
      return newState;
    },
    set_createdBoard: (state: AppProps = initialState, action: { payload: any}) => {
       const newState = {
        ...state,
        isBoardInCreate: action.payload.isBoardInCreate,
        createdBoardId: action.payload.createdBoardId,
        createdBoardTitle: action.payload.createdBoardTitle,
        createdBoardDescription: action.payload.createdBoardDescription,
      }
      return newState;
    },
    remove_createdBoard: (state: AppProps) => {
      const newState = {
        ...state,
        isBoardInCreate: false,
        createdBoardId: '',
        createdBoardTitle: '',
        createdBoardDescription: '',
      }
      return newState;
    }
  } 
});

export const { set_editedBoard, remove_editedBoard, set_createdBoard, remove_createdBoard } = appSlice.actions;

export default appSlice.reducer;