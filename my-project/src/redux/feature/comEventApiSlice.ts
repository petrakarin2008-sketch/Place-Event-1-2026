import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { Event, IEvents } from '../../types';

interface FetchEventsArgs {
  start: string;
  end: string;
  page: number;
}
export const FetchEvents = createAsyncThunk(
  'events/fetch',
  async ({ start, end, page }: FetchEventsArgs, thunkAPI) => {
    try {
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?startDateTime=${start}&page=${page}&endDateTime=${end}&apikey=BpvqSH8A8zdDv1ji3n1Hs5sQiPpDt77w`,
      );
      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData.error.message || 'Ошибка сервера');
      }
      const arr = await response.json();
      return arr;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export interface WeatherState {
  comingEvents: IEvents | undefined;
  favouriteEv: Record<string, Omit<Event, 'id'>>;
  isLoading: boolean;
  error: string;
}

const initialState: WeatherState = {
  comingEvents: undefined,
  isLoading: false,
  favouriteEv: {},
  error: '',
};

export const comEventApiSlice = createSlice({
  name: 'comSoonApi',
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      const { id, ...data } = action.payload;  //диструкторизация
      if (!state.favouriteEv[id]) {
        state.favouriteEv[id] = data;   //{'key':{...data}}
      }
    },
    removeFavourite: (state, action) => {
      const id = action.payload;
      if (state.favouriteEv[id]) {
        delete state.favouriteEv[id];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FetchEvents.fulfilled, (state, actions) => {
        state.comingEvents = actions.payload;

        state.isLoading = false;
      })
      .addCase(FetchEvents.rejected, (state, actions) => {
        state.isLoading = false;
        state.error = (actions.payload as string) || 'Unknown error';
      });
  },
});
export const { addFavourite, removeFavourite } = comEventApiSlice.actions;
export default comEventApiSlice.reducer;
