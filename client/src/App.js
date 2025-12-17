import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./Components/Welcome";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import MemberShip from "./Components/MemberShip";
import MyClasses from "./Components/MyClasses";
import BookClass from "./Components/BookClass";
import Profile from "./Components/Profile";
import CaloriesCalculater from "./Components/CaloriesCalculater";
import Feedback from "./Components/Feedback";
import Admin from "./Components/Admin";
import AdminRoute from "./Components/AdminRoute";
import AboutDevelopers from "./Components/AboutDevelopers";







function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/MemberShip" element={<MemberShip />} />
        <Route path="/MyClasses" element={<MyClasses />} />
        <Route path="/bookclass" element={<BookClass />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Feedback" element={<Feedback />} />
        <Route path="/CaloriesCalculater" element={<CaloriesCalculater />} />
        <Route path="/admin" element={<AdminRoute> <Admin /> </AdminRoute> }/>
        <Route path="/aboutDevelopers" element={<AboutDevelopers />} />


      </Routes>
    </Router>
  );
}

export default App;
