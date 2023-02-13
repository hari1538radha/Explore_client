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
import { UploadData } from "../../Redux/Slice/UploadSlice";
import moment from "moment";

const LandingPage = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [mainData, setData] = useState("");
  const upload = (e) => {
    e.preventDefault();
    const ele = e.target.elements;
    const placeName = ele[0].value;
    const placeDescription = ele[1].value;
    const placeTag = ele[2].value;
    const placeImage = ele[3].files;
    console.log({ placeName, placeDescription, placeTag, placeImage });
    dispatch(UploadData({ placeName, placeDescription, placeTag, placeImage }));
    ele[0].value = "";
    ele[1].value = "";
    ele[2].value = "";
    ele[3].value = "";
  };
  const { Details, loadinguser } = useSelector((state) => state.uploaddata);
  useEffect(() => {
    setData(Details);
  }, [Details]);

  useEffect(() => {
    dispatch(Displaydata(0));
  }, []);

  const handelPageChange = (data) => {
    const page = data.selected;
    dispatch(Displaydata(page));
  };
  const { Display, loading } = useSelector((state) => state.Displaydata);
  useEffect(() => {
    setData(Display);
  }, [Display]);
  console.log(Display);

  const handleDetailpage = (e) => {
    console.log(e);
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

  console.log(Display.placeImag);

  return (
    <>
      <div className="NavBarConatiner">
        <img className="Logo" src={Logo} />
        <div className="UserName_block">
          <div className="User_image_Block">
            <img src={logOutLogo} className="user_Image"></img>
          </div>
          <p className="UserName">User</p>
          <button className="Btn-signin-landing">
            <img src={logOutLogo}></img>
          </button>
        </div>
      </div>
      <div className="Main_Container">
        <div className="row row-cols-1 row-cols-md-3 g-4" id="cards">
          {" "}
          {mainData.length > 0 &&
            mainData.map((obj) => {
              return (
                <div
                  className="col"
                  key={obj._id}
                  onClick={(e) => handleDetailpage(e)}
                >
                  <div className="card h-100">
                    <img className="card-img-top" />
                    <div className="card-body">
                      <p className="Tags">{obj.placeTag}</p>
                      <h3 className="card-title">{obj.placeName}</h3>
                      <p className="card-text">{obj.placeDescription}</p>
                      <moment>({obj.createdAt})</moment>
                    </div>
                  </div>
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

          <form onSubmit={upload}>
            <div className="Upload_Block">
              <div className="Upload_Header">Create a Explore</div>
              <input
                type="text"
                placeholder="  Title *"
                className="Upload_Title"
                required={true}
              ></input>
              <input
                type="text"
                placeholder="  Message *"
                className="Message_Text"
                required={true}
              ></input>
              <input type="text" placeholder="  Tags *" required={true}></input>
              <input type="file" required={true}></input>
              <button className="btn btn-primary" type="submit">
                SUBMIT
              </button>
              <button type="reset">CLEAR</button>
            </div>
          </form>

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
