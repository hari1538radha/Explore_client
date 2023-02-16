import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../component/Config/Config";
export const getUser = createAsyncThunk("userdatas", async (data) => {
  console.log(data);
  return Axios.post("/authenticate/login",data);
});

export const logReducer = createSlice({
  name: "User",
  initialState: {
    loginData: [],
    loadingdata: false,
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
