import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import axios from "axios";
import "./styles.css";
import Footer from "./Footer";
import { setClasses } from "../Features/bookedClassesSlice";

const MyClasses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // المستخدم من Redux أو localStorage
  const userRedux = useSelector((state) => state.users.user);
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const user = userRedux || userLocal;

  // الكلاسات والعضوية من Redux
  const bookedClasses = useSelector((state) => state.bookedClasses.classes);
  const membership = useSelector((state) => state.bookedClasses.membership);

  const goHome = () => navigate("/home");

  const handleDelete = async (classId) => {
    if (!user) return;

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/deleteBookedClass/${user._id}/${classId}`
      );
      if (response.status === 200) {
        dispatch(setClasses(response.data.bookedClasses || []));
      } else {
        alert("لم يتم الحذف بنجاح");
      }
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء الحذف");
    }
  };

  return (
    <div className="book-container">
      {/* Header */}
      <div className="book-header">
        <button className="back-btn" onClick={goHome}>
          <FaArrowLeft size={20} />
        </button>
        <h1 className="header-title">My Classes & Membership</h1>
      </div>

      {/* Content */}
      <div className="book-page">
        {/* Membership Section */}
        {membership && (
          <div className="class-card">
            <div className="class-image">
              <img
                src={require(`../images/${membership.image}`)}
                alt={membership.title}
              />
            </div>
            <div className="class-info">
              <strong>{membership.title}</strong>
              <p>Coach: {membership.coachName}</p>
              <p style={{ color: "#aaa" }}>Membership</p>
            </div>
            <div className="class-side">
              <p className="price">{membership.price}</p>
              <p>{membership.duration}</p>
            </div>
          </div>
        )}

        {/* Classes Section */}
        {bookedClasses.length === 0 ? (
          <p style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
            You have not booked any classes yet.
          </p>
        ) : (
          bookedClasses.map((cls) => (
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
              <button
                className="delete-btn"
                onClick={() => handleDelete(cls.classId)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyClasses;
