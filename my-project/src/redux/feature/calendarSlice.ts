import { createSlice } from '@reduxjs/toolkit';

import type { eventArray } from '../../types';


export interface CounterState {
  value: number;
  event: eventArray[];
}

// const generateEvents = (count: number) => {
//   const baseDate = dayjs();

//   return Array.from({ length: count }, (_, i) => ({
//     id: i,
//     title: `Event ${i}`,
//     time: '10pm',
//     date: i < 3000 ? baseDate.toISOString() : baseDate.add(i % 10, 'day').toISOString(),
//     other: 'jj',
//   }));
// };

const initialState: CounterState = {
  value: 0,
  event: [],
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
      const eventToUpdate = state.event.find((el) => el.id === action.payload.id);
      if (eventToUpdate) {
        eventToUpdate.other = action.payload.newTitle; 
      }
    },
    addEvent: (state, action: SingleEvent) => {
      state.event = [...state.event, action.payload];
    },
    removeEvent: (state, action) => {
      state.event = state.event.filter((el) => el.id !== action.payload.id);
      console.log('message')
    },

  },
});

export const { renameEvent, addEvent, removeEvent } = calendarSlice.actions;

export default calendarSlice.reducer;
