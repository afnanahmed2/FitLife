import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Features/UserSlice";
import logo from "../images/logo.png";
import "./styles.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, msg } = useSelector(state => state.users);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLogin) navigate("/home");
  }, [isLogin, navigate]);

  const loginHandler = async () => {
  const actionResult = await dispatch(login({ email, password }));

  if (actionResult.payload?.user) {
    const user = actionResult.payload.user;

    // Store the user Data
    localStorage.setItem("userId", user._id);
    localStorage.setItem("user", JSON.stringify(user));

    // check if the user is Admin
    if (user.email === "admin@gmail.com") {
      navigate("/admin");
    } else {
      navigate("/home");
    }
  }
};


  return (
    <Container fluid>
      <Row>
        <Col lg="6">
          <div className="login-page">
            <div className="curve-section">
              <img src={logo} alt="FitLife Logo" className="logo-image" />
            </div>

            <div className="login-card">
              <div className="input-box">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="email-input"
                />
              </div>

              <div className="input-box">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                   data-testid="password-input"
                />
              </div>

              <button type="button" className="login-btn" onClick={loginHandler}>
                LOGIN
              </button>

              <p className="register-text">
                Don’t have an account? <Link to="/register">Register here</Link>
              </p>

              {msg && <p className="server-msg">{msg}</p>}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
