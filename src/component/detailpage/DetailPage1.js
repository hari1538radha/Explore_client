import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { card } from "react-bootstrap";
import "./DetailPage.css";
import { useLocation } from "react-router-dom";
import { searchDetails } from "../../Redux/Slice/SearchSlice";
import { useState } from "react";
import loader from "../Images/copper-loader.gif";
import { useNavigate } from "react-router-dom";
import Logo from "../Images/Explore.jpg";
import logOutLogo from "../Images/carbon_power.svg";
const DetailsPage = () => {
  const dispatch = useDispatch();
  const Location = useLocation();
  const navigate = useNavigate()
  const [details, setDetails] = useState();
  console.log(Location?.state?.id);
  const id = Location?.state?.id;
  const { data, loading, detailData, DetailLoading } = useSelector(
    (state) => state.Search
  );
  useEffect(() => {
    dispatch(searchDetails(id));
  }, []);
  useEffect(() => {
    setDetails(detailData?.data?.data);
    console.log(details);
  }, [detailData]);
const handellogout = () =>
{
  navigate("/")
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
      <div className="outer">
        <div className="content">
          {DetailLoading === true && (
            <div className="loader-class">
              <h1>Loading Data....!</h1>
              <img src={loader}></img>
            </div>
          )}
          {DetailLoading === false && (
            <div className="detail-container">
              <div className="text-content">
                <h1 className="tittle">{details?.placeName}</h1>
                <p className="hashtag">{details?.placeTag}</p>
                <p className="text">{details?.placeDescription}</p>
                <p className="creator">Created By:MasterClass</p>
                <p className="duration">6 hours ago</p>
              </div>
              <div className="image">
                <img
                  className="detail-image"
                  src={details?.placeImage}
                  alt={details?.placeName}
                />
              </div>
            </div>
          )}

          {/* <p className="DetailPage-PostTime">{mockData[1].Time}</p> */}
        </div>
      </div>
    </>
  );
};
export default DetailsPage;
