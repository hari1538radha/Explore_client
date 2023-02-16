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
    loginloading: false,
  },
  reducer: {},
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.loginloading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.loginData = action.payload;
      state.loginloading = false;
    },
    [getUser.rejected]: (state, action) => {
      state.loginloading = true
    },
  },
});

const loginReducer = logReducer.reducer;

export default loginReducer;
