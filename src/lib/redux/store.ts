import { configureStore } from "@reduxjs/toolkit";
import jobsSlice from "./slices/jobsSlice";
import spinnerSlice from "./slices/spinnerSlice";
import jobSlice from "./slices/jobSlice";
import skillSlice from "./slices/skillSlice";
import searchSlice from "./slices/searchSlice";

export const Store = configureStore({
  reducer: {
    jobs: jobsSlice,
    job: jobSlice,
    skill: skillSlice,
    spinner: spinnerSlice,
    search: searchSlice,
  },
});
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
