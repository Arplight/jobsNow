import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchJob } from "../../api/api";
import { IJob } from "../../types/apiTypes";
import { toast } from "react-toastify";

// types
export interface IJobInit {
  job: IJob | null;
  loading: boolean;
  error: string | null;
}
const JobSlice = createSlice({
  name: "job",
  initialState: <IJobInit>{
    job: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchJob.fulfilled,
        (state, action: PayloadAction<{ data: { job: IJob } }>) => {
          state.loading = false;
          state.job = action.payload.data.job;
        }
      )
      .addCase(fetchJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch job";
        console.error(state.error);
        toast.error(state.error);
      });
  },
});
export default JobSlice.reducer;
