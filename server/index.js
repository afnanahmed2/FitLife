import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Models/UserModel.js";
import bcrypt from "bcrypt";
import dotenv from 'dotenv'
import FeedbackModel from "./Models/FeedbackModel.js";


dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());

//Database connection
const connectString =`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@postfitlifecluster.tpm1bdi.mongodb.net/${process.env.DB_NAME}?appName=PostFitLifeCluster`
mongoose.connect(connectString);

//Register
app.post("/registerUser",async(req,res)=>{
    try{
        const{name,email,phoneNum,age,gender,password} = req.body
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = new UserModel({name,email,phoneNum,age,gender,password:hashedpassword})
        await user.save()
        res.send({user:user,msg:"documents saved successfully"})
    }
    catch(error){
        console.log(error)
        res.status(500).send({msg:"An Error occurred"})
    }
})

//Login


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Wrong password" });

    res.json({
      msg: "Login success",
      user: user, // مهم جدًا الاسم يكون "user"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});




//Logout
app.post("/logout", async(req,res) =>{ 
  res.status(200).send({msg: "logout successful"});
})

//Book a class
app.post("/bookClass", async (req, res) => {
  try {
    const { userId, classData } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).send({ msg: "User not found" });

    const exists = user.bookedClasses.find(c => c.classId === classData.classId);
    if (!exists) {
      user.bookedClasses.push(classData);
      await user.save();
    }

    res.status(200).send({ bookedClasses: user.bookedClasses, msg: "Class booked successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
});

//Get booked classes
// Get booked classes + membership
app.get("/getBookedClasses/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) return res.status(404).send({ msg: "User not found" });

    res.status(200).send({ 
      bookedClasses: user.bookedClasses, 
      bookedMembership: user.membership ? {
        title: user.membership,
        image: `${user.membership.toLowerCase()}.jpg`, // أو أي اسم ملف عندك
        coachName: "N/A", // إذا عندك بيانات Coach لكل عضوية ممكن تضيفي
        price: "$100",      // حسب نوع العضوية
        duration: "1 Month" // مثال
      } : null
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
});


//Delete booked class
app.delete("/deleteBookedClass/:userId/:classId", async (req, res) => {
  try {
    const { userId, classId } = req.params;
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { bookedClasses: { classId: classId } } },
      { new: true }
    );
    if (!updatedUser) return res.status(404).send({ msg: "User not found" });

    res.status(200).send({
      bookedClasses: updatedUser.bookedClasses,
      msg: "Class deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
});

//Update user profile
app.put("/updateProfile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, phoneNum, age, gender, password } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).send({ msg: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    user.phoneNum = phoneNum || user.phoneNum;
    user.age = age || user.age;
    user.gender = gender || user.gender;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.status(200).send({ user, msg: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
});

// Get user by ID
app.get("/getUser/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) return res.status(404).send({ msg: "User not found" });
    res.status(200).send({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
});

// Book Membership
app.post("/bookMembership", async (req, res) => {
  const { userId, membershipType } = req.body;
  const user = await UserModel.findById(userId);
  if (!user) return res.status(404).send({ msg: "User not found" });

  user.membership = membershipType; // تأكد أن هذا الاسم مطابق لاسم الصورة
  await user.save();

  res.status(200).send({ user, msg: "Membership booked successfully" });
});

// Submit feedback
app.post("/submitFeedback", async (req, res) => {
  try {
    const { userId, rating, description } = req.body;

    if (!userId || !rating || !description) {
      return res.status(400).send({ msg: "All fields are required" });
    }

    // Optional: تحقق من وجود المستخدم
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).send({ msg: "User not found" });

    const feedback = new FeedbackModel({ userId, rating, description });
    await feedback.save();

    res.status(200).send({ feedback, msg: "Feedback submitted successfully" });
  } catch (error) {
    console.error(error); // هذا مهم لطباعة الخطأ في console
    res.status(500).send({ msg: "Server error while submitting feedback" });
  }
});


// Get all feedbacks
app.get("/getAllFeedback", async (req, res) => {
  try {
    const feedbacks = await FeedbackModel.find()
      .populate("userId", "name email"); // نجيب اسم وإيميل المستخدم

    res.status(200).send({ feedbacks });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error while fetching feedbacks" });
  }
});


// Get all booked classes for all users
app.get("/getAllUsersBookedClasses", async (req, res) => {
  try {
    const users = await UserModel.find({}, "name bookedClasses"); // فقط الاسم والكلاسات
    res.status(200).send({ users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
});




app.listen(process.env.PORT, () => {
  console.log("Server running ");
});
