import React, { useState } from "react";
import "./LandingPage.css";

import Logo from "../Images/Explore.jpg";
import logOutLogo from "../Images/carbon_power.svg";

import { SearchData } from "../../Redux/Slice/SearchSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Upload from "./Upload";
import Display from "./Display";
const LandingPage = () => {
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    e.preventDefault();
    const ele = e.target.elements;
    const location = ele[0].value;
    const tag = ele[1].value;
    ele[0].value = "";
    ele[1].value = "";
    console.log(location, tag);
    dispatch(SearchData({ location, tag }));
  };
  const navigate = useNavigate()
  const handellogout = () =>
  {
    // navigate("/")
  }
  return (
    <>
    <div className="NavBarConatiner">
        <img className="Logo" src={Logo} />
        <div className="UserName_block">
          {/* <div className="User_image_Block">
            <img src={logOutLogo} className="user_Image"></img>
          </div> */}
          <p className="UserName">User</p>
          <button onClick={handellogout} className="Btn-signin-landing">
            <img src={logOutLogo}></img>
          </button>
        </div>

      </div>
      <div className="flex">
      
      <Display/>
      
      <div className="Right-container">
        <form onSubmit={handleSearch}>
          <div className="Search_block">
            <input
              type="text"
              placeholder="  Search *"
              className="Searchby-name"
              required={true}
            ></input>
            <input
              type="text"
              placeholder="  Search Tag *"
              className="searchby-tags"
              required={true}
            ></input>
            <div className="d-grid gap-2">
              <button className="btn_searchs">SEARCH</button>
            </div>
          </div>
        </form>
        <Upload />
      </div>
    </div></>
   
  );
};

export default LandingPage;
