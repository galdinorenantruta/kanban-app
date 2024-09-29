import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectSlice"; // Importa o reducer
import tabReducer from "./tabSlice";

const store = configureStore({
  reducer: {
    projects: projectReducer,
    tabs: tabReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
