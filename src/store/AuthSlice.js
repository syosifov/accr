import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authData: {}
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        lgn: (state, action) => {
            state.authData = action.payload;
        },
        lgt: (state) => {
            state.authData = {};
        }
    }
});

export const authActions = authSlice.actions;

export const authDataSel = (state) => state.authRed.authData;

export default authSlice.reducer;