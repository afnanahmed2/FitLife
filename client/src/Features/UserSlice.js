import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Logout
export const logout = createAsyncThunk("users/logout", async () => {
  const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/logout`);
  return response.data.msg;
});

// Login
export const login = createAsyncThunk(
  "users/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { email, password } = userData;
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, { email, password });
      const user = response.data.user;
      const msg = response.data.msg;
      return { user, msg };
    } catch (error) {
      const msg = error.response?.data?.msg || "Login failed";
      return rejectWithValue({ msg });
    }
  }
);

// Register
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { name, email, phoneNum, age, gender, password } = userData;
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/registerUser`, {
        name, email, phoneNum, age, gender, password
      });
      const user = response.data.user;
      const msg = response.data.msg;
      return { user, msg };
    } catch (error) {
      const msg = error.response?.data?.msg || "Registration failed";
      return rejectWithValue({ msg });
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    msg: null,
    status: null,
    isLogin: false
  },
  reducers: {},
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerUser.pending, (state) => { state.status = "pending"; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
        state.msg = action.payload.msg;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "rejected";
        state.msg = action.payload.msg;
      });

    // Login
    builder
      .addCase(login.pending, (state) => { state.status = "pending"; })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.isLogin = true;
        state.user = action.payload.user;
        state.msg = action.payload.msg;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";
        state.isLogin = false;
        state.msg = action.payload.msg;
      });

    // Logout
    builder
      .addCase(logout.pending, (state) => { state.status = "loading"; })
      .addCase(logout.fulfilled, (state) => {
        state.isLogin = false;
        state.status = "success";
        state.user = null;
      })
      .addCase(logout.rejected, (state) => { state.status = "rejected"; });
  }
});

export default userSlice.reducer;
