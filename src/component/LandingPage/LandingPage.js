import React, { useState } from "react";
import "./LandingPage.css";
import { useEffect } from "react";
import Logo from "../Images/Explore.jpg";
import logOutLogo from "../Images/carbon_power.svg";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Displaydata } from "../../Redux/Slice/DisplayData";
import { SearchData } from "../../Redux/Slice/SearchSlice";
import { useDispatch, useSelector } from "react-redux";
import loader from "../Images/copper-loader.gif";
import Upload from "./Upload";
const LandingPage = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [mainData, setData] = useState("");

  useEffect(() => {
    dispatch(Displaydata(0));
  }, []);

  const handelPageChange = (data) => {
    const page = data.selected;
    setData([]);
    dispatch(Displaydata(page));
  };
  const { Display, loadingdata } = useSelector((state) => state.Displaydata);
  useEffect(() => {
    setData(Display);
  }, [Display]);
  console.log(Display);

  const handleDetailpage = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    const id = e.target.id;
    Navigate("/LandingPage/Detailpage", {
      state: {
       
        data:Display,
        id: id
      },
    });
  };

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
  const { data, loadings } = useSelector((state) => state.Search);
  console.log(data);


 
  const { Details, loadinguser } = useSelector((state) => state.uploaddata);
  const { loginData, loginloading } = useSelector((state) => state.User);
  console.log(loginData?.data?.username);
  useEffect(() => {
    setData(Details);
  }, [Details]);
  return (
    <>
      <div className="NavBarConatiner">
        <img className="Logo" src={Logo} />
        <div className="UserName_block">
          {/* <div className="User_image_Block">
            <img src={logOutLogo} className="user_Image"></img>
          </div> */}
          <p className="UserName">User</p>
          <button className="Btn-signin-landing">
            <img src={logOutLogo}></img>
          </button>
        </div>
      </div>
      <div className="Main_Container">
        <div className="row row-cols-1 row-cols-md-3 g-4" id="cards">
          {
            <div className="loader">
              {loadingdata == true && (
                <div className="loader-class">
                  <h1>Loading Data....!</h1>
                  <img src={loader}></img>
                </div>
              )}
            </div>
          }{" "}
          {/* {
            <div className="loader">
              { loadingdata == false  (
                <div className="loader-class">
                  <h1>Loading Datsgegvrzeaa....!</h1>
                  <img src={loader}></img>
                </div>
              )}
            </div>
          } */}
          {mainData.length > 0 &&
            mainData.map((obj) => {
              return (
                <div
                  class="container"
                  id={obj._id}
                  onClick={(e) => handleDetailpage(e)}
                >
                  <img
                    class="suggest-image"
                    src={obj.placeImage}
                    id={obj._id}
                    alt="suggest"
                  />
                  <div id={obj._id} class="top-left">
                    <p id={obj._id}>
                      {loginData?.data?.username}
                      <br />
                      <moment id={obj._id}>({obj.createdAt})</moment>
                    </p>
                  </div>
                  <div id={obj._id} className="hashtags">
                    <p id={obj._id}>{obj.placeTag}</p>
                  </div>
                  <p id={obj._id} className="place">
                    {obj.placeName}
                  </p>
                  <p id={obj._id} class="suggest-description">
                    {obj.placeDescription}
                  </p>
                </div>
              );
            })}
        </div>
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
<Upload/>

          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={".."}
            pageCount={9}
            marginPagesDisplayed={3}
            pageRangeDisplayed={1}
            containerClassName={"pagination justify-content-center "}
            onPageChange={handelPageChange}
            pageClassName={"page-item"}
            previousClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
          />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
