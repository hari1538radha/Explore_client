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
  const { loginData, loading } = useSelector((state) => state.User);
  console.log(loginData);
  const signIn = (e) => {
    e.preventDefault();
    const ele = e.target.elements;
    const email = ele[0].value;
    const pass = ele[1].value;
    dispatch(getUser({ email, pass }));
    // ele[0].value = "";
    // ele[1].value = "";
  };
  useEffect(() => {
    if (loginData.message) {
      window.alert(" Login is Sucess");
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
