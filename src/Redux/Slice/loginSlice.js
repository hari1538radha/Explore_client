import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../component/Config/Config.js";
export const getUser = createAsyncThunk("User", async (data) => {
  console.log(data);
  return Axios.get("/authenticate/login", data);
  // const result = fetch(
  //   ``,data
  // ).then((res) => {
  //   return res.json();
  // });
  // return result;
});

export const logReducer = createSlice({
  name: "User",
  initialState: {
    loginData: [],
    loading: false,
  },
  reducer: {},
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.loginData = action.payload;
      state.loading = false;
    },
    [getUser.rejected]: (state, action) => {},
  },
});

const loginReducer = logReducer.reducer;

export default loginReducer;
