import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accData: []
}

const accSlice = createSlice({
    name: 'accSlice',
    initialState,
    reducers: {
        loadData: (state, action) => {
            state.accData = action.payload;
        },
        reset: (state) => state.accData = initialState.accData
    }
})

export const accActions = accSlice.actions;
export const accDataSel = state => state.accReducer.accData;
export default accSlice.reducer;

