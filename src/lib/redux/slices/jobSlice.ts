import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchJob, fetchJobList } from "../../api/api";
import { IJob } from "../../types/apiTypes";
import { toast } from "react-toastify";

// types
export interface IJobInit {
  // for single job
  job: IJob | null;
  loading: boolean;
  error: string | null;
  // for jobs list
  jobsList: IJob[] | [];
  jobsListLoading: boolean;
  jobsListError: string | null;
}
const JobSlice = createSlice({
  name: "job",
  initialState: <IJobInit>{
    // for single job
    job: null,
    loading: false,
    error: null,
    // for jobs list
    jobsList: [],
    jobsListLoading: false,
    jobsListError: null,
  },
  reducers: {
    // reseting the jobs list
    resetJobsList: (state) => {
      state.jobsList = [];
    },
  },
  extraReducers: (builder) => {
    // job handlers
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
      .addCase(
        fetchJob.rejected,
        (state, action: PayloadAction<{ message: string }>) => {
          state.loading = false;
          state.error = action.payload?.message || "Failed to fetch job";
          console.error(state.error);
          toast.error(state.error);
        }
      );
    // jobs list handlers
    builder
      .addCase(fetchJobList.pending, (state) => {
        state.jobsListLoading = true;
        state.jobsListError = null;
      })
      .addCase(
        fetchJobList.fulfilled,
        (state, action: PayloadAction<{ data: { job: IJob } }>) => {
          state.jobsListLoading = false;
          state.jobsList = [...state.jobsList, action.payload.data.job];
        }
      )
      .addCase(fetchJobList.rejected, (state, action) => {
        state.jobsListLoading = false;
        state.jobsListError =
          action.payload?.message || "Failed to fetch jobs list";
        console.error(state.jobsListError);
        toast.error(state.jobsListError);
      });
  },
});
export default JobSlice.reducer;
export const { resetJobsList } = JobSlice.actions;
