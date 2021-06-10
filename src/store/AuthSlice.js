import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authData: null
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        lgn(state, action) {
            state.authData = action.payload;
        },
        logout(state) {
            state.authData = null;
        }
    }
});

export const authActions = authSlice.actions;

export const authData = (state) => state.authRed.authData;

export default authSlice.reducer;