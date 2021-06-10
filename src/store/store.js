import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from './AuthSlice';

export const store = configureStore({
    reducer: {
        counterRed: counterReducer,
        authRed: authReducer
    },
});
