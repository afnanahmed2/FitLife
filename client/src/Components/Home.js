import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./styles.css";
import { FaThumbsUp } from "react-icons/fa6";
import { Link } from "react-router-dom";

//import Posts from "./Posts";
//import SharePosts from "./SharePost";
import User from "./User";
//import {  Row, Col } from "reactstrap"; //import the Reactstrap Components
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"

const Home = () => {
  const {isLogin} = useSelector(state => state.users)
  const navigate = useNavigate()
  useEffect(()=>{
      if(!isLogin)
        navigate("/login")
  },[])

  return (
    <div className="home-container">
      <Header />

      <div className="home-buttons">
        
  <Link to="/bookclass" className="home-btn">
          <p><FaThumbsUp /></p>
          <h3>Book Class</h3>
        </Link>

        <Link to="/membership" className="home-btn">
          <span className="icon">🪪</span>
          <h3>Membership</h3>
        </Link>

          <Link to="/CaloriesCalculater" className="home-btn">
          <span className="icon">🍎</span>
          <h3>Calories Calculator</h3>
        </Link>

       <Link to="/MyClasses" className="home-btn">
          <span className="icon">🏋️</span>
          <h3>My Classes / My Membership</h3>
        </Link>

      </div>

      <Footer />
    </div>
  );
}

export default Home;
