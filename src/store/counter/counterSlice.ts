'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
// los toma del store index.ts
import type { RootState, AppDispatch } from '../index'


interface CounterState {
  count: number;
  isReady: boolean;
}

const initialState: CounterState = {
 count: 5,
 isReady: false
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

    initCounterState: (state, action: PayloadAction<number>) => {
      if (state.isReady) return;

      state.count = action.payload;
      state.isReady = true;
    },

    addOne: (state) => {
      state.count++;
    },
    substractOne: (state) => {
      if (state.count < 0) return  // Prevent negative count
      state.count--;
    },
    resetCount: (state, action: PayloadAction<number>) => {
      if (action.payload < 0) action.payload = 0; // Prevent negative reset
      state.count = action.payload;
    }
  }
});

export const {addOne, substractOne, resetCount, initCounterState} = counterSlice.actions;

export default counterSlice.reducer;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();