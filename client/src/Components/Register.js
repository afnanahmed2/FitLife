import {
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useState } from "react";
import { registerUser } from "../Features/UserSlice";
import { userSchemaValidation } from "../Validations/UserValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import logo from "../images/logo.png";

const Register = () => {
  const {user,status,msg,isLogin} = useSelector(state => state.users)

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phoneNum, setphoneNum] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const userData = {name,email,phoneNum,age,gender,password}
    dispatch(registerUser(userData))
    navigate("/login")
  };

  return (
     <Container fluid>
      <Row className="formrow">
      <Col className="columndiv1" lg="6">
      <div className="register-container">
      <form className="div-form" onSubmit={handleSubmit(onSubmit)}>
    <section className="form">
 
      <div className="register-box">
        <div className="form-group">
        <img src={logo} alt="FitLifeLogo" className="register-logo" /></div>

        <h2 className="register-title">Create Account</h2>
        {/* Name*/}
        <div className="form-group">
        <input
        type="text" 
        placeholder="Full Name" 
        className="register-input"
        id="name" 
        {...register("name", {
              onChange: (e) => setname(e.target.value),
                  })}/>
        <p className="error">{errors.name?.message}</p>  
        </div>
       {/* Email*/}
        <div className="form-group">
        <input 
        type="email"
         placeholder="Enter your Email" 
         className="register-input"
         id="email" 
        {...register("email", {
           onChange: (e) => setemail(e.target.value),
         })} 
         />
        <p className="error">{errors.email?.message}</p> 
         </div>
        {/*Phone Number */}
        <div className="form-group">
        <input
         type="text" 
         placeholder="Enter your Phone Number" 
         className="register-input" 
         id="phoneNum"
         {...register("phoneNum", {
           onChange: (e) => setphoneNum(e.target.value),
         })} 
         />
         <p className="error">{errors.phoneNum?.message}</p> 
         </div> 

              {/*Age */}
      <div className="form-group">
        <input
          type="text" 
          placeholder="Enter your Age" 
          className="register-input"
          id="age" 
          {...register("age", {
            onChange: (e) => setage(e.target.value),
          })}
          style={{ textAlign: 'left', width: '100%' }}
        />
        <p className="error">{errors.age?.message}</p>
      </div>


        {/* gender*/}
        <div className="gender-box" style={{ textAlign: 'center' }}>
          <label className="gender-title">Gender:</label>
          <div className="form-group" style={{ display: 'inline-block', margin: '0 10px' }}>
            <label className="gender-item">
              <input 
              type="radio" 
              value="male" 
              {...register("gender", {
             required: "Gender is required",   
          onChange: (e) => setgender(e.target.value),
           })}/>
              <span>Male</span>
            </label>
          </div>
          <div className="form-group" style={{ display: 'inline-block', margin: '0 10px' }}>
            <label className="gender-item">
              <input 
              type="radio" 
              value="female"
              {...register("gender", {
                required: "Gender is required",
          onChange: (e) => setgender(e.target.value),
           })} />
              <span>Female</span>
            </label>
          </div>
          <p className="error">{errors.gender?.message}</p>
        </div>

  {/* Password*/}
        <div className="form-group">
        <input 
        type="password" 
        placeholder="Enter your Password" 
        className="register-input" 
        id="password"
        {...register("password", {
            onChange: (e) => setpassword(e.target.value),
            })}
        />
        <p className="error">{errors.password?.message}</p>
        </div>

       <div className="form-group"> 
        <input 
        type="password" 
        placeholder="Confirm your Password"
        className="register-input" 
        id="confirmPassword"
        {...register("confirmPassword", {
          onChange: (e) => setconfirmPassword(e.target.value),
            })}
        />
        <p className="error">{errors.confirmPassword?.message}</p>
        </div> 

        <Button className="register-btn">Register</Button>

        <p className="register-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

    </section>
    </form>
    </div>
      </Col>
      <Col className="columndiv2" lg="6">
        <h6>{user?.name} - {user?.email}</h6>
        <h6>{status}</h6>
        <h6>{msg}S</h6>
        </Col>      
      </Row>
    </Container>
  );
}

export default Register;
