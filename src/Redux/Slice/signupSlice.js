import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signup = createAsyncThunk("user", async (data) => {
  const signupdata = fetch(
    "https://quaint-jeans-fly.cyclic.app/authenticate/signup",
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userFirstname: data.userFirstname,
        userLastname: data.userLastname,
        userEmail: data.userEmail,
        userPassword: data.userPassword,
        userPhoneNumber: data.userPhoneNumber,
      }),
    }
  ).then((res) => {
    return res.json();
  });
  return signupdata;
});
const SignupReducer = createSlice({
  name: "sign",
  initialState: {
    data: [],
    loading: false,
  },
  reducer: {},
  extraReducers: {
    [signup.pending]: (state, action) => {
      state.loading = true;
    },
    [signup.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [signup.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
const returndata = SignupReducer.reducer;
export default returndata;
