import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";
import logo from "../images/logo.png";
import "./styles.css";
import { login } from "../Features/UserSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaValidation } from "../Validations/UserValidations";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import User from "../Components/User";


const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [country,setCountry] = useState(null)
  const [region,setRegion] = useState(null)


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
    defaultValues: {
      name: "",
      email: "",
      phoneNum: "",
      age: "",
      gender: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const currentUser = user || JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      setValue("name", currentUser.name);
      setValue("email", currentUser.email);
      setValue("phoneNum", currentUser.phoneNum);
      setValue("age", currentUser.age);
      setValue("gender", currentUser.gender);
    }
  }, [user, setValue]);

  const goHome = () => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    navigate("/home");
  } else {
    navigate("/login");
  }
};


  const onSubmit = async (data) => {
    const currentUser = user || JSON.parse(localStorage.getItem("user"));
    if (!currentUser) {
      alert("User not loaded yet.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_LOCATION_APIKEY}/updateProfile/${currentUser._id}`,
        {
          name: data.name,
          email: data.email,
          phoneNum: data.phoneNum,
          age: data.age,
          gender: data.gender,
          password: data.password || undefined,
        }
      );

      alert(response.data.msg);
      const updatedUser = response.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      dispatch(login({ email: updatedUser.email, password: "" }));
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      {/* Header*/}
      <div className="book-header">
        <button className="back-btn" onClick={goHome}>
          <FaArrowLeft size={20} />
        </button>
        <h1 className="header-title">My Profile</h1>
      </div>

      <Row className="formrow">
        <Col lg="6" className="columndiv1">
          <div className="register-container">
            <form className="div-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="register-box">
                <div className="form-group">
                  <img src={logo} alt="Logo" className="register-logo" />
                </div>
                <div>
                    <h3>  Your Location: </h3>
                    <User/>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="register-input"
                    {...register("name")}
                    placeholder="Full Name"
                  />
                  <p className="error">{errors.name?.message}</p>
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    className="register-input"
                    {...register("email")}
                    placeholder="Enter your Email"
                  />
                  <p className="error">{errors.email?.message}</p>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="register-input"
                    {...register("phoneNum")}
                    placeholder="Enter your Phone Number"
                  />
                  <p className="error">{errors.phoneNum?.message}</p>
                </div>

                <div className="form-group">
                  <input
                    type="number"
                    min="0"
                    className="register-input"
                    {...register("age")}
                    placeholder="Enter your Age"
                  />
                  <p className="error">{errors.age?.message}</p>
                </div>

                <div className="gender-box" style={{ textAlign: "center" }}>
                  <label className="gender-title">Gender:</label>
                  <label className="gender-item">
                    <input type="radio" value="male" {...register("gender")} /> Male
                  </label>
                  <label className="gender-item">
                    <input type="radio" value="female" {...register("gender")} /> Female
                  </label>
                  <p className="error">{errors.gender?.message}</p>
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    placeholder="New Password"
                    className="register-input"
                    {...register("password")}
                  />
                  <p className="error">{errors.password?.message}</p>
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="register-input"
                    {...register("confirmPassword")}
                  />
                  <p className="error">{errors.confirmPassword?.message}</p>
                </div>

                <Button
                  type="submit"
                  className="register-btn"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
