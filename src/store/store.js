import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from './AuthSlice';
import accReducer from './AccSlice'

export const store = configureStore({
    reducer: {
        counterRed: counterReducer,
        authReducer,
        accReducer
    },
});
