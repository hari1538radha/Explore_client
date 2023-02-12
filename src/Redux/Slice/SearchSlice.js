import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const SearchData = createAsyncThunk("Searchdata", async (data) => {

    const response = fetch(`http://localhost:5000/authenticate/search?placeTag=${data.tag}&placeName=${data.location}`).then((res) => {
        return res.json();
    }
    );

    return response;
})


const SearchedData = createSlice({
    name: "Searchbyname",
    initialState: {
        data: [],
        loadings: false
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
        }

    }
})
const SearchedDatas = SearchedData.reducer;
export default SearchedDatas;