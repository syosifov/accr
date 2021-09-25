import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authData: {
        token: '',
        tokenIssuedAt: 0,
        tokenExpiresAt: 0,
        tokenIssuedAtDat: '',
        tokenExpiresAtDat: '',
        roles: [],
        refreshToken: '',
        refreshTokenIssuedAt: 0,
        refreshTokenExpiresAt: 0,
        refreshTokenIssuedAtDat: '',
        refreshTokenExpiresAtDat: ''
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

export const authDataSel = (state) => state.authReducer.authData;

export default authSlice.reducer;