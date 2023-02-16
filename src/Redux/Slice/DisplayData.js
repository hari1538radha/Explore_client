import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const Displaydata = createAsyncThunk("displayData", async (page) => {
  const response = fetch(
    `https://quaint-jeans-fly.cyclic.app/authenticate/home?page=${page}&limit=10`
  ).then((res) => {
    return res.json();
  });
  console.log(response);
  return response;
});

export const DisplayDatareducer = createSlice({
  name: "displayData",
  initialState: {
    Display: [],
    loadingdata: true,
  },

  reducers: {},
  extraReducers: {
    [Displaydata.pending]: (state, action) => {
      state.loadingdata = true;
    },
    [Displaydata.fulfilled]: (state, action) => {
      state.Display = action.payload.data;
      state.loadingdata = false;
    },
    [Displaydata.rejected]: (state, action) => {
      state.loadingdata = true;
    },
  },
});

const Display = DisplayDatareducer.reducer;
export default Display;
