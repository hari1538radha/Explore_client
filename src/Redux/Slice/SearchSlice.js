import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../component/Config/Config";
export const SearchData = createAsyncThunk("Searchdata", async (data) => {
  const response = fetch(
    `https://quaint-jeans-fly.cyclic.app/authenticate/search?placeTag=${data.tag}&placeName=${data.location}`
  ).then((res) => {
    return res.json();
  });

  return response;
});
export const searchDetails = createAsyncThunk("searchDetails", async (data) => {
 return  Axios.get( `/authenticate/details?id=${data}`)

});

const SearchedData = createSlice({
  name: "Searchbyname",
  initialState: {
    data: [],
    loadings: false,
    detailData: [],
    DetailLoading: true,
  },
  reducer: {},
  extraReducers: {
    [SearchData.pending]: (state, action) => {
      state.loadings = true;
    },
    [SearchData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loadings = false;
    },
    [SearchData.rejected]: (state, action) => {
      state.loadings = false;
    },
    [searchDetails.pending]: (state, action) => {
      state.DetailLoading = true;
    },
    [searchDetails.fulfilled]: (state, action) => {
      state.DetailLoading = false;
      state.detailData = action.payload;
    },
    [searchDetails.rejected]: (state, action) => {
      state.DetailLoading = true;
    },
  },
});
const SearchedDatas = SearchedData.reducer;
export default SearchedDatas;
