import { configureStore, combineReducers } from "@reduxjs/toolkit";
import Upload from "../Slice/UploadSlice";
import loginReducer from "../Slice/loginSlice"
import returndata from "../Slice/signupSlice"
import Display from "../Slice/DisplayData";
import SearchedDatas from "../Slice/SearchSlice";


const rootReducer = combineReducers({ User: loginReducer, sigupdata: returndata, Displaydata: Display, Search: SearchedDatas, uploaddata: Upload })


const store = configureStore({

        reducer: rootReducer,

});


export default store;