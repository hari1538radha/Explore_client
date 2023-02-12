import React from "react";
// import { mockData } from "../mockdata/detailpageMockdata";
import "bootstrap/dist/css/bootstrap.min.css";
import { card } from "react-bootstrap";
import "./DetailPage.css";
const DetailsPage = () => {
  return (
    <div className="outer">
      <div className="content">
        <div className="text-content">
          <h1 className="tittle">Paris</h1>
          <p className="hashtag">#paris#europe#city</p>
          <p className="text">
            The most populous city of France. Since the 17th century, Paris has
            been one of Europe's major centres of finance, diplomacy, commerce,
            fashion, gastronomy, science and arts.
          </p>
          <p className="creator">Created By:MasterClass</p>
          <p className="duration">6 hours ago</p>
        </div>
        <div className="image">
          <img
            className="detail-image"
            src="https://hdwallpaperim.com/wp-content/uploads/2017/08/31/149631-HDR-France-Paris-cityscape.jpg"
            alt="paris"
          />
        </div>
        {/* <p className="DetailPage-PostTime">{mockData[1].Time}</p> */}
      </div>
    </div>
  );
};
export default DetailsPage;
