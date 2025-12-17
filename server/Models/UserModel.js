import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNum: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },

  profilePic: {
    type: String,
    default: "logo.png",
  },

  bookedClasses: [
    {
      classId: String,
      className: String,
      coachName: String,
      price: String,
      time: String,
      image: String,
    },
  ],
});

const UserModel = mongoose.model("userInfos", UserSchema);
export default UserModel;
