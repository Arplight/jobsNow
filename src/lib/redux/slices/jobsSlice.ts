import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchJobs, fetchSearchJobs } from "../../api/api";
import { IJob, IJobsResponse, JobsMeta } from "../../types/apiTypes";
import { toast } from "react-toastify";

// types
export interface IJobsInit {
  // All jobs
  jobs: IJob[] | null;
  meta: JobsMeta | null;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  // Search results
  searchResults: IJob[] | null;
  searchMeta: JobsMeta | null;
  searchLoading: boolean;
  searchError: string | null;
}

const initialState: IJobsInit = {
  // All jobs
  jobs: null,
  meta: null,
  loading: false,
  error: null,
  hasMore: true,
  // Search results
  searchResults: null,
  searchMeta: null,
  searchLoading: false,
  searchError: null,
};

const JobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    // search Reset
    resetSearch: (state) => {
      state.searchResults = null;
    },
  },
  extraReducers: (builder) => {
    // All jobs handlers
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchJobs.fulfilled,
        (state, action: PayloadAction<{ data: IJobsResponse }>) => {
          state.loading = false;
          state.jobs = state.jobs
            ? [...state.jobs, ...action.payload.data.jobs]
            : action.payload.data.jobs;
          state.meta = action.payload.data.meta;
          state.hasMore = !!action.payload.data.meta.next;
        }
      )
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch jobs";
        console.error(state.error);
        toast.error(state.error);
      });

    // Search jobs handler
    builder
      .addCase(fetchSearchJobs.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(
        fetchSearchJobs.fulfilled,
        (state, action: PayloadAction<{ data: IJobsResponse }>) => {
          state.searchLoading = false;
          state.searchResults = action.payload.data.jobs;
          state.searchMeta = action.payload.data.meta;
        }
      )
      .addCase(fetchSearchJobs.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.error.message || "Failed to fetch jobs";
        console.error(state.searchError);
        toast.error(state.searchError);
      });
  },
});

export default JobsSlice.reducer;
export const { resetSearch } = JobsSlice.actions;
