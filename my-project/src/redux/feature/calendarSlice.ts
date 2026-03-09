import { createSlice } from '@reduxjs/toolkit';

import type { eventArray } from '../../types';

export interface CounterState {
  value: number;
  event: eventArray[];
}

const initialState: CounterState = {
  value: 0,
  event: [
    
  ],
};

interface SingleEvent {
  payload: { id: number; date: string; title: string; time: string; other: string };
}

interface payl {
  payload: { id: number; newTitle: string };
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    renameEvent: (state, action: payl) => {
      state.event = state.event.map((el) =>
        el.id === action.payload.id ? { ...el, other: action.payload.newTitle } : el,
      );
    },
    addEvent: (state, action: SingleEvent) => {
      state.event = [...state.event, action.payload];
    },
    removeEvent:(state,action)=>{
      state.event = state.event.filter((el)=> el.id !== action.payload)
    }
  },
});


export const { renameEvent, addEvent } = calendarSlice.actions;

export default calendarSlice.reducer;
