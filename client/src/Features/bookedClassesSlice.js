// Features/bookedClassesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const bookedClassesSlice = createSlice({
  name: "bookedClasses",
  initialState: {
    classes: [],
    membership: null, // Store Membership
  },
  reducers: {
    addClass: (state, action) => {
      const exists = state.classes.find(cls => cls.classId === action.payload.classId);
      if (!exists) state.classes.push(action.payload);
    },
    removeClass: (state, action) => {
      state.classes = state.classes.filter(cls => cls.classId !== action.payload.classId);
    },
    setClasses: (state, action) => {
      state.classes = action.payload;
    },
    setMembership: (state, action) => {
      state.membership = action.payload;
    },
    clearClasses: (state) => {
      state.classes = [];
      state.membership = null;
    },
  },
});

export const { addClass, removeClass, setClasses, setMembership, clearClasses } = bookedClassesSlice.actions;
export default bookedClassesSlice.reducer;
