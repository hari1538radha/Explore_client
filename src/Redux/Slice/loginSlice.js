import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("User", async (data) => {
  console.log(data);
  const result = fetch(`https://quaint-jeans-fly.cyclic.app/authenticate/login`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userEmail: data.email,
      userPassword: data.pass,
 
    }),
  }).then((res) => {
    return res.json();
  });
  return result;
});

export const logReducer = createSlice({
  name: "userdata",
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
