import { createSlice } from "@reduxjs/toolkit";

const SpinnerSlice = createSlice({
  name: "spinner",
  initialState: { isShown: false },
  reducers: {
    showSpinner: (state) => {
      state.isShown = true;
    },
    hideSpinner: (state) => {
      state.isShown = false;
    },
  },
});
export default SpinnerSlice.reducer;
export const { showSpinner, hideSpinner } = SpinnerSlice.actions;
