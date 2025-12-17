import React from "react";
import "./styles.css";
import { FaArrowLeft, FaIdCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import MembershipData from "./MembershipData";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setMembership, setClasses } from "../Features/bookedClassesSlice";

const MemberShip = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRedux = useSelector((state) => state.users.user);
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const user = userRedux || userLocal;

  const goHome = () => navigate("/home");

  const handleChoose = async (plan) => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      // حجز العضوية في السيرفر
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/bookMembership`,
        {
          userId: user._id,
          membershipType: plan.title,
        }
      );

      alert(res.data.msg);

      // تحديث العضوية في Redux فورًا
      dispatch(
        setMembership({
          title: plan.title,
          image: plan.image,
          coachName: plan.coachName,
          price: plan.price,
          duration: plan.duration,
        })
      );

      // تحديث الكلاسات من السيرفر للتأكد من تزامن البيانات
      const classesRes = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/getBookedClasses/${user._id}`
      );
      dispatch(setClasses(classesRes.data.bookedClasses || []));
    } catch (err) {
      console.error(err);
      alert("Error booking membership");
    }
  };

  return (
    <div className="book-container">
      {/* Header */}
      <div className="book-header">
        <button className="back-btn" onClick={goHome}>
          <FaArrowLeft size={20} />
        </button>
        <h1 className="header-title">
          <FaIdCard style={{ marginRight: "8px" }} />
          Membership
        </h1>
      </div>

      {/* Membership Cards */}
      <div className="book-page">
        {MembershipData.map((plan) => (
          <div className="class-card" key={plan.membershipId}>
            <div className="class-image">
              <img src={require(`../images/${plan.image}`)} alt={plan.title} />
            </div>
            <div className="class-info">
              <strong>{plan.title}</strong>
              <p>Coach: {plan.coachName}</p>
            </div>
            <div className="class-side">
              <p className="price">{plan.price}</p>
              <p>{plan.duration}</p>
            </div>
            <button className="book-btn" onClick={() => handleChoose(plan)}>
              Choose
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default MemberShip;
