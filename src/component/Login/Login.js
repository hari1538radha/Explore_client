import React, { useState } from "react";
import VectorLogo from "../Images/Vector.svg";
import google from "../Images/google-logo-transparent-alphabet-4.png";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Redux/Slice/loginSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [Error, setError] = useState("");
  
  const signIn = (e) => {
    e.preventDefault();
    const ele = e.target.elements;
    const userEmail = ele[0].value;
    const userPassword = ele[1].value;
    dispatch(getUser( {userEmail, userPassword} ));
    // ele[0].value = "";
    // ele[1].value = "";
  };
  const { loginData, loading } = useSelector((state) => state.User);
  console.log(loginData.data);
  useEffect(() => {
    if (loginData.data.message== "Valid password") {
      window.alert(" Login is Success");
      Navigate("/LandingPage");
    } else {
      setError("");
    }
  }, [loginData]);

  return (
    <form className="form" onSubmit={signIn}>
      <div className="LoginContainer">
        <img className="Vector" src={VectorLogo} />

        <input
          type="text"
          placeholder="   Email Address *"
          required
          className="Input-box1"
        ></input>
        <input
          type="text"
          placeholder="   password *"
          required
          className="Input-box2"
        ></input>
        <div>
          <span>{Error}</span>
        </div>
        <button className="Sign-in-btn">SIGN IN</button>

        <button className="Sign-in-btn-glg">
          <img className="Googlelogo" src={google} />
          GOOGLE SIGN IN
        </button>
        <p className="footer-signup-link">
          {" "}
          Don't have an account ? <Link to="/signup">SIGN UP</Link>
        </p>
      </div>{" "}
    </form>
  );
};

export default Login;
