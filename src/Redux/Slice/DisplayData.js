import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const Displaydata = createAsyncThunk("displayData", async (page) => {

    const response = fetch(`http://localhost:5000/authenticate/home?page=${page}&limit=1`).then((res) => {

        return res.json();


    })
    console.log(response);
    return response;


} );

export const DisplayDatareducer = createSlice(
    {
        name: "displayData",
        initialState:
        {
            Display: [],
            loading: false
        },

        reducers: {},
        extraReducers: {
            [Displaydata.pending]: (state, action) => {
                state.loading = true;
            },
            [Displaydata.fulfilled]: (state, action) => {

                state.Display = action.payload.data;
                state.loading = false;
            },
            [Displaydata.rejected]: (state, action) => {
                state.loading = false;
            }

        },
    },
);

const Display = DisplayDatareducer.reducer;
export default Display;