import { configureStore } from '@reduxjs/toolkit'

import calendar from './feature/calendarSlice'
import weather from './feature/weatherSlice'
import eventsApi from './feature/comEventApiSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    calendar,
    weather,
    eventsApi
  }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();