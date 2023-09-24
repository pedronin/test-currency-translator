import { createSlice } from '@reduxjs/toolkit';
import { ISlice } from './types';

const initialState: ISlice = {
  courseData: [],
  leftInputVal: 1,
  rightInputVal: 1,
  leftSelectCoin: 'ethereum',
  rightSelectCoin: 'bitcoin',
  currInput: 'left',
};

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setCourseData(state, action) {
      state.courseData = action.payload;
    },
    setInputVal(state, action) {
      if (action.payload.position === 'left') {
        state.leftInputVal = action.payload.text;
      } else {
        state.rightInputVal = action.payload.text;
      }
    },
    setSelectCoin(state, action) {
      if (action.payload.position === 'left') {
        state.leftSelectCoin = action.payload.text;
      } else {
        state.rightSelectCoin = action.payload.text;
      }
    },
    setCurrInput(state, action) {
      state.currInput = action.payload;
    },
    reverseCoin(state) {
      const left = state.leftSelectCoin;
      state.leftSelectCoin = state.rightSelectCoin;
      state.rightSelectCoin = left;
    },
    convert(state) {
      if (!state.courseData) return;
      const currPriceLeftCoin = state.courseData.find(
        (obj) => obj.id === state.leftSelectCoin,
      )?.current_price;
      const currPriceRightCoin = state.courseData.find(
        (obj) => obj.id === state.rightSelectCoin,
      )?.current_price;

      if (currPriceLeftCoin && currPriceRightCoin) {
        if (state.currInput === 'left') {
          // во сколько раз одно число больше другого
          const diff = currPriceLeftCoin / currPriceRightCoin;
          state.rightInputVal = +(+state.leftInputVal * diff).toFixed(6);
        } else {
          const diff = currPriceRightCoin / currPriceLeftCoin;
          state.leftInputVal = +(+state.rightInputVal * diff).toFixed(6);
        }
      }
    },
  },
});

export const { setCourseData, setInputVal, setSelectCoin, setCurrInput, reverseCoin, convert } =
  slice.actions;
export default slice.reducer;
