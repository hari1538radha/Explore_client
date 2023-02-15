import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../component/Config/Config";
export const UploadData = createAsyncThunk("uploadData", async (data) => {
  console.log(data.placeName);
return Axios.post("/authenticate/upload",data)
  
});
console.log(UploadData);
export const UploadReducer = createSlice({
  name: "uploadData",
  initialState: {
    Details: [],
    loadinguser: false,
  },
  reducer: {},
  extraReducers: {
    [UploadData.pending]: (state, action) => {
      state.loadinguser = true;
    },
    [UploadData.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.loginData = action.payload;
      state.loadinguser = false;
    },
    [UploadData.rejected]: (state, action) => {
      state.loadinguser = false;
    },
  },
});

const Upload = UploadReducer.reducer;

export default Upload;
