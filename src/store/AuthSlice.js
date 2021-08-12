import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authData: {
        token: '',
        issuedAt: 0,
        expiresAt: 0,
        refreshToken: ''
    }
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        lgn: (state, action) => {
            state.authData = action.payload;
        },
        lgt: (state) => {
            // state.authData = action.payload;
            state.authData = initialState.authData;
        }
    }
});

export const authActions = authSlice.actions;

export const authDataSel = (state) => state.authRed.authData;

export default authSlice.reducer;