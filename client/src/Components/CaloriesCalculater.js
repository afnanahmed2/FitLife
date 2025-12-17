import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./styles.css";
import Footer from "./Footer";

function CaloriesCalculator() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/home");
  };

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [activity, setActivity] = useState("");
  const [gender, setGender] = useState("");
  const [calories, setCalories] = useState(null);
  const [deficitCalories, setDeficitCalories] = useState(null);

  const calculateCalories = () => {
    if (!height || !weight || !age || !activity || !gender) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    let BMR = 0;
    if (gender === "male") {
      BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityLevels = {
      sedentary: 1.2,
      moderate: 1.55,
      very: 1.75,
      extra: 1.9,
    };

    const dailyCalories = BMR * activityLevels[activity];
    const deficit = dailyCalories - 500;

    setCalories(dailyCalories.toFixed(2));
    setDeficitCalories(deficit.toFixed(2));
  };

  return (
    <div className="book-container">
      {/* الهيدر */}
      <div className="book-header">
        <button className="back-btn" onClick={goHome}>
          <FaArrowLeft size={20} />
        </button>
        <h1 className="header-title">Calories Calculator</h1>
      </div>

      {/* محتوى الفورم في الوسط */}
      <div
        className="book-page"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 100px - 60px)", // 100px = header height, 60px = footer height
        }}
      >
        <div className="calculator-box" style={{ marginBottom: "20px" }}>
          <input
            type="number"
              min="0"
            placeholder="Length (cm)"
            value={height}
            onChange={(e) => {
             const value = e.target.value;
             if (value >= 0) setHeight(value);
             }}
          />
          <input
            type="number"
            min="0"
            placeholder="Weight (Kg)"
            value={weight}
           onChange={(e) => {
              const value = e.target.value;
              if (value >= 0) setWeight(value);
             }}
          />
          <input
            type="number"
            min="0"
            placeholder="Age"
            value={age}
            onChange={(e) => {
            const value = e.target.value;
            if (value >= 0) setAge(value);
            }}
          />

          <p className="sub-text">Daily activity:</p>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="activity"
                onChange={() => setActivity("sedentary")}
              />{" "}
              Sedentary
            </label>
            <label>
              <input
                type="radio"
                name="activity"
                onChange={() => setActivity("moderate")}
              />{" "}
              Moderately Active
            </label>
            <label>
              <input
                type="radio"
                name="activity"
                onChange={() => setActivity("very")}
              />{" "}
              Very Active
            </label>
            <label>
              <input
                type="radio"
                name="activity"
                onChange={() => setActivity("extra")}
              />{" "}
              Extra Active
            </label>
          </div>

          <p className="sub-text">Select your gender:</p>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                onChange={() => setGender("male")}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                onChange={() => setGender("female")}
              />{" "}
              Female
            </label>
          </div>

          <button className="book-btn" onClick={calculateCalories}>
            Calculate
          </button>

          {calories && (
            <>
              <p className="result-text">
                🔥 The Daily Calories you need is:{" "}
                <strong>{calories} kcal</strong>
              </p>
              <p className="result-text">
                🥗 Recommended Healthy Deficit (-500):{" "}
                <strong>{deficitCalories} kcal</strong>
              </p>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CaloriesCalculator;
