import { configureStore } from '@reduxjs/toolkit'
import usersReducer from "../Features/UserSlice";
import bookedClassesReducer from "../Features/bookedClassesSlice";

export const store = configureStore({
  reducer: {
    users:usersReducer,
    bookedClasses: bookedClassesReducer,
  },
})
