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
  const [placeImage, setLink] = useState("");

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
    console.log({ placeName, placeDescription, placeTag, placeImage });
    dispatch(UploadData({ placeName, placeDescription, placeTag, placeImage }));
    ele[0].value = "";
    ele[1].value = "";
    ele[2].value = "";
    dispatch(Displaydata(page));
  };
  const { Details, loadinguser } = useSelector((state) => state.uploaddata);
  const { loginData, loadingdata } = useSelector((state) => state.User);
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
          {" "}
          {mainData.length > 0 &&
            mainData.map((obj) => {
              return (
                <div
                  class="container"
                  key={obj._id}
                  onClick={(e) => handleDetailpage(e)}
                >
                  <img
                    class="suggest-image"
                    src={obj.placeImage}
                    alt="suggest"
                  />
                  <div class="top-left">
                    <p>
                      {loginData?.data?.username}
                      <br />
                      <moment>({obj.createdAt})</moment>
                    </p>
                  </div>
                  <div className="hashtags">
                    <p>{obj.placeTag}</p>
                  </div>
                  <p className="place">{obj.placeName}</p>
                  <p class="suggest-description">{obj.placeDescription}</p>
                </div>
                // <div
                //   className="col"

                // >
                //   <div className="card h-100">
                //     <img className="card-img-top" />
                //     <div className="card-body">
                //       <p className="Tags"></p>
                //       <h3 className="card-title"></h3>
                //       <p className="card-text"></p>

                //     </div>
                //   </div>
                // </div>
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
              <progress defaultValue={0} value={progress}></progress>
              <p>{ (progress < 100 && progress > 1 ) && <p>image Uploading wait !!!</p>}</p>
              <p>{progress == 100 && <p>image uploaded please submit</p>}</p>

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
