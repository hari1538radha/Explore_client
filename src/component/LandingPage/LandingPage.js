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
import AWS from "aws-sdk";

const LandingPage = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [mainData, setData] = useState("");

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
  const [progress, setProgress] = useState(0);
  const [filename, setFileName] = useState();
  const [AWSImagelink, setLink] = useState("");

  const HandelFilePath = (e) => {
    const file = e.target.files[0];
    const fileName = e.target.files[0].name;
    setFileName(fileName);

    const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY;
    const secretAccessKeys = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
    //
    AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKeys,
    });

    const myBucket = new AWS.S3({
      params: { Bucket: process.env.REACT_APP_AWS_RESUME_FOLDER },
      region: "eu-west-2",
    });
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: process.env.REACT_APP_AWS_RESUME_FOLDER,
      Key: fileName,
    };

    myBucket
      .putObject(params)
      .on("success", (pro) => {
        if (pro?.request?.httpRequest?.stream?.responseURL)
          setLink(pro?.request?.httpRequest?.stream?.responseURL);
      })
      .on("httpUploadProgress", (evt) => {
        console.log(evt);
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });

    useEffect(() => {
      if (progress === 100) {
        console.log("done");
      }
    }, [progress]);
  };
  console.log(Display.placeImag);
  const upload = (e) => {
    e.preventDefault();
    const ele = e.target.elements;
    const placeName = ele[0].value;
    const placeDescription = ele[1].value;
    const placeTag = ele[2].value;
    console.log({ placeName, placeDescription, placeTag, AWSImagelink });
    dispatch(
      UploadData({ placeName, placeDescription, placeTag, AWSImagelink })
    );
    ele[0].value = "";
    ele[1].value = "";
    ele[2].value = "";
  };
  const { Details, loadinguser } = useSelector((state) => state.uploaddata);
  useEffect(() => {
    setData(Details);
  }, [Details]);
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
              <input
                type="file"
                required={true}
                onChange={HandelFilePath}
                accept="image/png, image/jpeg, images/jpg"
              ></input>
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
