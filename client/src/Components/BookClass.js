import React from "react";
import classData from "./ClassData";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { setClasses } from "../Features/bookedClassesSlice";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import Footer from "./Footer";

function BookClass() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRedux = useSelector((state) => state.users.user);
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const user = userRedux || userLocal;

  const handleBook = async (cls) => {
    if (!user) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/bookClass`,
        {
          userId: user._id,
          classData: cls,
        }
      );
     // After booking the class will be directly updated
      dispatch(setClasses(response.data.bookedClasses || []));
      alert(response.data.msg);
    } catch (error) {
      console.log(error);
      alert("Error booking class");
    }
  };

  const goHome = () => {
    navigate("/home");
  };

  return (
    <div className="book-container">
      {/* Header */}
      <div className="book-header">
        <button className="back-btn" onClick={goHome}>
          <FaArrowLeft size={20} />
        </button>
        <h1 className="header-title">Book Class</h1>
      </div>

      {/* Classes */}
      <div className="book-page">
        {classData.map((cls) => (
          <div className="class-card" key={cls.classId}>
            <div className="class-image">
              <img src={require(`../images/${cls.image}`)} alt={cls.className} />
            </div>
            <div className="class-info">
              <strong>{cls.className}</strong>
              <p>Coach: {cls.coachName}</p>
            </div>
            <div className="class-side">
              <p className="price">{cls.price}</p>
              <p>{cls.time}</p>
            </div>
            <button className="book-btn" onClick={() => handleBook(cls)}>
              Book
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default BookClass;
