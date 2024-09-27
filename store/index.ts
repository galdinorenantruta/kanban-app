import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectSlice"; // Importa o reducer

const store = configureStore({
  reducer: {
    projects: projectReducer, // Certifique-se de que a chave "projects" é usada corretamente
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
